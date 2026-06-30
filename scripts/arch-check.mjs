#!/usr/bin/env node

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'fs'
import { join, relative, resolve, basename, dirname } from 'path'

const ROOT = resolve(import.meta.dirname, '..')
const SRC = join(ROOT, 'src')
const REPORT_PATH = join(ROOT, 'project-core', 'validation', 'report.md')
const EXTENSIONS = new Set(['.ts', '.tsx', '.mjs', '.js', '.jsx'])

// ─── Token Database ────────────────────────────────────────────────────

const TOKENS = {
  spacing: {
    file: 'tokens/spacing',
    values: new Map([
      ['py-[120px]', 'SECTION_PADDING_Y'],
      ['min-h-[550px] sm:min-h-[650px] lg:min-h-[800px]', 'STICKY_IMAGE_HEIGHTS'],
      ['min-h-[110vh]', 'HERO_MIN_HEIGHT'],
      ['grayscale-[20%]', 'IMAGE_GRAYSCALE'],
    ]),
  },
  shadows: {
    file: 'tokens/shadows',
    values: new Map([
      ['0 2px 8px rgba(0,0,0,0.35)', 'TEXT_SHADOW_HEADER'],
      ['hover:drop-shadow-[0_0_6px_rgba(224,192,80,0.3)]', 'HEADER_DROP_GLOW'],
      ['shadow-[0_0_20px_rgba(201,162,39,0.10),0_0_40px_rgba(201,162,39,0.05)]', 'CTA_GLOW_DEFAULT'],
      ['hover:shadow-[0_0_30px_rgba(201,162,39,0.18),0_0_60px_rgba(201,162,39,0.10)]', 'CTA_GLOW_HOVER'],
    ]),
  },
  timing: {
    file: 'tokens/timing',
    values: new Map([
      ['0.83, 0, 0.17, 1', 'EASE_CINEMATIC_DOOR'],
    ]),
  },
}

const FOUNDATION_DIRS = ['tokens', 'motion', 'providers', 'controllers', 'hooks', 'utils', 'config']

const FORBIDDEN_IMPORT_PREFIXES = [
  '../components/',
  '../pages/',
  '../lib/',
  '../../components/',
  '../../pages/',
  '../../lib/',
]

// ─── Utilities ─────────────────────────────────────────────────────────

function* walk(dir) {
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      const stat = statSync(full)
      if (stat.isDirectory()) {
        if (entry === 'node_modules' || entry.startsWith('.')) continue
        yield* walk(full)
      } else if (EXTENSIONS.has(ext(full))) {
        yield full
      }
    }
  } catch { /* skip unreadable */ }
}

function ext(p) { return p.slice(p.lastIndexOf('.')) }

function read(p) {
  try { return readFileSync(p, 'utf-8') }
  catch { return '' }
}

function relativePath(from, to) {
  return relative(dirname(from), to).replace(/\\/g, '/')
}

// ─── Import Boundary Check ─────────────────────────────────────────────

function checkImports(file, content) {
  const issues = []
  const importRe = /import\s+(?:[\w*{},\s]+)\s+from\s+['"]([^'"]+)['"]/g
  let m
  while ((m = importRe.exec(content)) !== null) {
    const target = m[1]
    if (target.startsWith('../') || target.startsWith('../../')) {
      for (const prefix of FORBIDDEN_IMPORT_PREFIXES) {
        if (target.startsWith(prefix)) {
          issues.push({
            severity: 'critical',
            file,
            line: content.slice(0, m.index).split('\n').length,
            message: `Foundation imports application code: ${target}`,
            detail: `Found in ${relative(SRC, file)}, imports ${target}. Foundation must never import from components/, pages/, lib/, or App.tsx.`,
          })
        }
      }
    }
  }
  return issues
}

// ─── Hardcoded Token Value Check ───────────────────────────────────────

function checkHardcodedTokens(file, content) {
  const issues = []
  const rel = relative(SRC, file)

  // Skip Foundation files themselves
  if (rel.startsWith('foundation/')) return issues

  // Read the file's imports to see which tokens are already imported
  const importLines = new Set()
  const importRe = /import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g
  let m
  while ((m = importRe.exec(content)) !== null) {
    for (const name of m[1].split(',').map(s => s.trim())) {
      importLines.add(name)
      importLines.add(name.split(' as ')[0].trim())
    }
  }

  // Check each token category
  for (const [, category] of Object.entries(TOKENS)) {
    for (const [value, tokenName] of category.values) {
      // Skip if already imported
      if (importLines.has(tokenName)) continue

      // Search for the hardcoded value (not preceded by a variable reference or template literal)
      const escaped = value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      const re = new RegExp(escaped, 'g')
      if (re.test(content)) {
        issues.push({
          severity: 'error',
          file,
          line: 1,
          message: `Hardcoded "${value}" — use ${tokenName} from ${category.file}`,
          detail: `File ${rel} contains the value "${value}" which has a Foundation equivalent. Import ${tokenName} from ${category.file} instead.`,
        })
      }
    }
  }

  return issues
}

// ─── Hardcoded Z-index Check ───────────────────────────────────────────

function checkHardcodedZIndex(file, content) {
  const issues = []
  const rel = relative(SRC, file)
  if (rel.startsWith('foundation/')) return issues

  const importRe = /import\s+\{[^}]*\bZ_/g
  if (importRe.test(content)) return issues // already uses z-index tokens

  const zRe = /z-\d+/g
  let m
  const found = new Set()
  while ((m = zRe.exec(content)) !== null) {
    const val = m[0]
    if (val === 'z-0' || val === 'z-10' || val === 'z-20' ||
        val === 'z-60' || val === 'z-70' || val === 'z-80' || val === 'z-100') {
      found.add(val)
    }
  }

  if (found.size > 0) {
    issues.push({
      severity: 'warning',
      file,
      line: 1,
      message: `Hardcoded z-index classes: ${[...found].join(', ')}`,
      detail: `File ${rel} uses raw z-index Tailwind classes. Import from tokens/z-index.ts instead.`,
    })
  }

  return issues
}

// ─── Duplicated Motion Detection ───────────────────────────────────────

function checkDuplicatedMotion(files) {
  const issues = []
  const easingCounts = new Map()
  const durationCounts = new Map()

  for (const file of files) {
    const rel = relative(SRC, file)
    if (!rel.startsWith('components/') && !rel.startsWith('pages/') && !rel.startsWith('foundation/')) continue

    const content = read(file)

    // Find custom easing arrays [float, float, float, float]
    const easingRe = /\[(\d+\.?\d*),\s*(\d+\.?\d*),\s*(\d+\.?\d*),\s*(\d+\.?\d*)\]/g
    let m
    while ((m = easingRe.exec(content)) !== null) {
      const key = `${m[1]}, ${m[2]}, ${m[3]}, ${m[4]}`
      const entry = easingCounts.get(key) || { files: [], count: 0 }
      entry.files.push(file)
      entry.count++
      easingCounts.set(key, entry)
    }

    // Find SSConstant duration objects
    const durRe = /duration:\s*(\d+\.?\d*)/g
    while ((m = durRe.exec(content)) !== null) {
      const val = parseFloat(m[1])
      if (val >= 0.1 && val <= 5) {
        const key = val.toString()
        const entry = durationCounts.get(key) || { files: [], count: 0 }
        entry.files.push(file)
        entry.count++
        durationCounts.set(key, entry)
      }
    }
  }

  // Report duplicated easings (appearing in 2+ different files, not in Foundation tokens)
  // Known Foundation easings
  const knownEasings = new Set(['0.83, 0, 0.17, 1'])

  for (const [easing, data] of easingCounts) {
    if (knownEasings.has(easing)) continue
    if (data.count >= 2) {
      const uniqueFiles = [...new Set(data.files.map(f => relative(SRC, f)))]
      issues.push({
        severity: 'warning',
        file: data.files[0],
        line: 1,
        message: `Duplicated easing [${easing}] appears in ${data.count} locations`,
        detail: `Found in: ${uniqueFiles.join(', ')}. Consider extracting to tokens/timing.ts.`,
      })
    }
  }

  return issues
}

// ─── Foundation Internal Dependency Check ──────────────────────────────

function checkFoundationInternalDeps(files) {
  const issues = []
  const foundationFiles = files.filter(f => relative(SRC, f).startsWith('foundation/'))

  for (const file of foundationFiles) {
    const content = read(file)
    const rel = relative(SRC, file)

    const importRe = /import\s+(?:[\w*{},\s]+)\s+from\s+['"]([^'"]+)['"]/g
    let m
    while ((m = importRe.exec(content)) !== null) {
      const target = m[1]
      // Check for circular deps: foundation -> components
      if (target.includes('../components/') || target.includes('../pages/') || target.includes('../lib/')) {
        issues.push({
          severity: 'critical',
          file,
          line: content.slice(0, m.index).split('\n').length,
          message: `Foundation module imports application code: ${target}`,
          detail: `${rel} imports ${target}. This breaks one-directional dependency.`,
        })
      }
    }
  }

  return issues
}

// ─── Public API Check ──────────────────────────────────────────────────

function checkPublicApiImports(files) {
  const issues = []
  for (const file of files) {
    const rel = relative(SRC, file)
    if (rel.startsWith('foundation/')) continue

    const content = read(file)
    const importRe = /import\s+(?:[\w*{},\s]+)\s+from\s+['"]([^'"]+)['"]/g
    let m
    while ((m = importRe.exec(content)) !== null) {
      const target = m[1]
      // Check for deep imports into foundation internals
      // Currently foundation has no private files, but check for
      // suspiciously deep paths that bypass module boundaries
      if (target.includes('foundation/') && !target.endsWith('.ts') && !target.endsWith('.tsx')) {
        // Already a clean module import, no issue
      }
    }
  }
  return issues
}

// ─── Report Generation ─────────────────────────────────────────────────

function generateReport(allIssues, scoredChecks) {
  const critical = allIssues.filter(i => i.severity === 'critical')
  const errors = allIssues.filter(i => i.severity === 'error')
  const warnings = allIssues.filter(i => i.severity === 'warning')
  const info = allIssues.filter(i => i.severity === 'info')

  const score = Math.max(0, scoredChecks.successRate)

  const date = new Date().toISOString().replace('T', ' ').slice(0, 19)

  let md = `# Architecture Validation Report

**Date**: ${date}
**Compliance Score**: ${score}/100
**Status**: ${score >= 90 ? '✅ PASS' : score >= 70 ? '⚠️ WARN' : '❌ FAIL'}

---

## Summary

| Metric | Count |
|--------|-------|
| Files scanned | ${scoredChecks.filesScanned} |
| Checks passed | ${scoredChecks.passed} |
| Critical violations | ${critical.length} |
| Errors | ${errors.length} |
| Warnings | ${warnings.length} |
| Info | ${info.length} |
| Deductions | ${scoredChecks.deductions} pts |

---

`

  if (critical.length > 0) {
    md += `## Critical Violations (Foundation → Application imports)\n\n`
    for (const issue of critical) {
      const loc = relative(SRC, issue.file)
      md += `- **${loc}:${issue.line}** — ${issue.message}\n`
    }
    md += `\n`
  }

  if (errors.length > 0) {
    md += `## Errors (Hardcoded values)\n\n`
    for (const issue of errors) {
      const loc = relative(SRC, issue.file)
      md += `- **${loc}** — ${issue.message}\n`
    }
    md += `\n`
  }

  if (warnings.length > 0) {
    md += `## Warnings\n\n`
    for (const issue of warnings) {
      const loc = relative(SRC, issue.file)
      md += `- **${loc}** — ${issue.message}\n`
    }
    md += `\n`
  }

  md += `## Verification Details\n\n`

  md += `### Import Boundaries\n`
  md += `Foundation → application imports: ${critical.length} violation(s) → **${critical.length === 0 ? '✅ PASS' : '❌ FAIL'}**\n\n`

  md += `### Token Usage\n`
  md += `Hardcoded values with Foundation equivalents: ${errors.length} → **${errors.length === 0 ? '✅ PASS' : '❌ FAIL'}**\n\n`

  md += `### Z-index\n`
  const zWarnings = warnings.filter(w => w.message.includes('z-index'))
  md += `Unreferenced z-index classes: ${zWarnings.length} file(s) → **${zWarnings.length === 0 ? '✅ PASS' : '⚠️ WARN'}**\n\n`

  md += `### Motion Duplication\n`
  const motionWarnings = warnings.filter(w => w.message.includes('Duplicated'))
  md += `Duplicated motion definitions: ${motionWarnings.length} → **${motionWarnings.length === 0 ? '✅ PASS' : '⚠️ WARN'}**\n\n`

  md += `### Governance Compliance\n`
  md += `Score: ${score}/100 — ${score >= 90 ? '✅ Compliant' : score >= 70 ? '⚠️ Needs attention' : '❌ Non-compliant'}\n\n`

  if (warnings.length > 0 || motionWarnings.length > 0) {
    md += `## Suggested Improvements\n\n`
    for (const w of warnings) {
      md += `1. ${w.detail}\n`
    }
    md += `\n`
  }

  md += `---\n`
  md += `*Report generated by \`scripts/arch-check.mjs\`.*\n`

  return md
}

// ─── Main ──────────────────────────────────────────────────────────────

async function main() {
  const allFiles = [...walk(SRC)]

  let allIssues = []
  let passed = 0
  let total = 0
  let deductions = 0

  // 1. Import boundary check on all Foundation files
  for (const file of allFiles) {
    const rel = relative(SRC, file)
    if (!rel.startsWith('foundation/')) continue
    const content = read(file)
    const issues = checkImports(file, content)
    allIssues.push(...issues)
  }

  // 2. Hardcoded token value check on non-Foundation files
  for (const file of allFiles) {
    const rel = relative(SRC, file)
    if (rel.startsWith('foundation/')) continue
    const content = read(file)
    allIssues.push(...checkHardcodedTokens(file, content))
    allIssues.push(...checkHardcodedZIndex(file, content))
  }

  // 3. Duplicated motion detection
  allIssues.push(...checkDuplicatedMotion(allFiles))

  // 4. Foundation internal deps
  allIssues.push(...checkFoundationInternalDeps(allFiles))

  // 5. Public API check
  allIssues.push(...checkPublicApiImports(allFiles))

  // Scoring
  const criticalCount = allIssues.filter(i => i.severity === 'critical').length
  const errorCount = allIssues.filter(i => i.severity === 'error').length
  const warningCount = allIssues.filter(i => i.severity === 'warning').length
  const infoCount = allIssues.filter(i => i.severity === 'info').length

  deductions += criticalCount * 30
  deductions += errorCount * 10
  deductions += warningCount * 5
  deductions += infoCount * 1

  // Passed checks: each checked file without critical/error is a pass
  for (const file of allFiles) {
    const rel = relative(SRC, file)
    const fileIssues = allIssues.filter(i => i.file === file && (i.severity === 'critical' || i.severity === 'error'))
    total++
    if (fileIssues.length === 0) passed++
  }

  // Also count motion/warning checks
  // Every foundation file that doesn't import app code
  for (const file of allFiles.filter(f => relative(SRC, f).startsWith('foundation/'))) {
    const rel = relative(SRC, file)
    total++
    const critIssues = allIssues.filter(i => i.file === file && i.severity === 'critical')
    if (critIssues.length === 0) passed++
  }

  const successRate = Math.max(0, 100 - deductions)

  const scoredChecks = {
    filesScanned: allFiles.length,
    passed,
    total,
    deductions,
    successRate,
  }

  const report = generateReport(allIssues, scoredChecks)

  // Print summary
  console.log(`\n  Architecture Validation Report`)
  console.log(`  ─────────────────────────────`)
  console.log(`  Files:      ${allFiles.length} scanned`)
  console.log(`  Score:      ${successRate}/100`)
  console.log(`  Critical:   ${criticalCount}`)
  console.log(`  Errors:     ${errorCount}`)
  console.log(`  Warnings:   ${warningCount}`)
  console.log(`  Deductions: ${deductions} pts`)
  console.log(`  Status:     ${successRate >= 90 ? 'PASS' : successRate >= 70 ? 'WARN' : 'FAIL'}\n`)

  // Write report
  const reportDir = dirname(REPORT_PATH)
  if (!existsSync(reportDir)) {
    const { mkdirSync } = await import('fs')
    mkdirSync(reportDir, { recursive: true })
  }
  writeFileSync(REPORT_PATH, report, 'utf-8')
  console.log(`  Report written to ${relative(ROOT, REPORT_PATH)}\n`)
}

main().catch(console.error)
