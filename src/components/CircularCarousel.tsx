import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import MorphingArrowButton from './MorphingArrowButton'

export interface CarouselImage {
  src: string
  alt: string
  instagram?: string
}

interface CircularCarouselProps {
  images: CarouselImage[]
  showNav?: boolean
  showDots?: boolean
  id?: string | null
  className?: string
  fullWidth?: boolean
}

const SPRING = { type: 'spring' as const, stiffness: 120, damping: 16, mass: 1 }
const SPRING_SLOW = { type: 'spring' as const, stiffness: 90, damping: 18, mass: 1.2 }
const NO_ANIM = { duration: 0 }
const SWIPE_THRESHOLD = 50
const AUTOPLAY_INTERVAL = 5000

function getSignedDist(index: number, from: number, total: number) {
  const raw = index - from
  const wrapped = ((raw % total) + total) % total
  return wrapped > total / 2 ? wrapped - total : wrapped
}

export default function CircularCarousel({
  images,
  showNav = true,
  showDots = true,
  id = 'galerie',
  className = '',
  fullWidth = false,
}: CircularCarouselProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [loadedAspects, setLoadedAspects] = useState<Record<number, number>>({})

  const dragStartX = useRef(0)
  const dragOffsetRef = useRef(0)

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isDraggingRef = useRef(false)

  const total = images.length
  const current = images[selectedIndex]

  const IMG_GAP = 6

  const containerHeight = useMemo(() => {
    if (!containerWidth) return 300
    const base = containerWidth * 0.55
    return Math.max(300, Math.min(base, window.innerHeight * 0.7))
  }, [containerWidth])

  const handleImageLoad = useCallback(
    (i: number, e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget
      if (img.naturalWidth && img.naturalHeight) {
        setLoadedAspects((prev) => {
          if (prev[i]) return prev
          return { ...prev, [i]: img.naturalWidth / img.naturalHeight }
        })
      }
    },
    [],
  )

  const empty = total === 0
  const single = total === 1

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const goTo = useCallback(
    (index: number) => {
      setSelectedIndex(((index % total) + total) % total)
    },
    [total],
  )

  const snap = useCallback(() => {
    const offset = dragOffsetRef.current
    isDraggingRef.current = false
    setIsDragging(false)
    setDragOffset(0)
    dragOffsetRef.current = 0
    if (offset < -SWIPE_THRESHOLD) goNext()
    else if (offset > SWIPE_THRESHOLD) goPrev()
  }, [goNext, goPrev])

  const handlePointerDown = useCallback(
    (clientX: number) => {
      if (single || empty) return
      isDraggingRef.current = true
      setIsDragging(true)
      dragStartX.current = clientX
      dragOffsetRef.current = 0
      setDragOffset(0)
    },
    [single, empty],
  )

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return
    const offset = clientX - dragStartX.current
    dragOffsetRef.current = offset
    setDragOffset(offset)
  }, [])

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return
    snap()
  }, [snap])

  useEffect(() => {
    if (!isDragging) return
    const handleMove = (e: MouseEvent) => handlePointerMove(e.clientX)
    const handleUp = () => handlePointerUp()
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [isDragging, handlePointerMove, handlePointerUp])


  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (single || empty) return
      switch (e.key) {
        case 'ArrowLeft':
          goPrev()
          break
        case 'ArrowRight':
          goNext()
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goPrev, goNext, single, empty])

  useEffect(() => {
    if (isHovered || isDragging || prefersReducedMotion || single || empty) {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      return
    }
    autoplayRef.current = setInterval(goNext, AUTOPLAY_INTERVAL)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isHovered, isDragging, goNext, prefersReducedMotion, single, empty])

  const getImgWidth = useCallback(
    (idx: number) => {
      const a = loadedAspects[idx]
      return a ? containerHeight * a : containerHeight * 0.8
    },
    [containerHeight, loadedAspects],
  )

  const containerPadding = containerWidth >= 768 ? 'px-8' : 'px-5'

  const Wrapper = id ? 'section' : 'div'
  const wrapperProps = id ? { id, className: `relative snap-start ${className}` } : { className: `relative ${className}` }

  if (empty) {
    return (
      <Wrapper {...wrapperProps}>
        <div ref={containerRef} className="invisible h-px overflow-hidden" aria-hidden="true" />
      </Wrapper>
    )
  }

  const edgeFadeMask =
    'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'

  const carousel = (
      <div
        ref={containerRef}
        className="relative select-none overflow-x-hidden"
        style={{
          perspective: '900px',
          cursor: isDragging ? 'grabbing' : 'grab',
          height: containerHeight ? `${containerHeight}px` : 'auto',
          maxHeight: '70vh',
          minHeight: '300px',
          maskImage: edgeFadeMask,
          WebkitMaskImage: edgeFadeMask,
        }}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
      onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
      onTouchEnd={handlePointerUp}

      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        if (isDragging) snap()
      }}
      role="region"
      aria-label="Galerie"
      aria-roledescription="carousel"
    >
      <div
        ref={trackRef}
        className="relative w-full h-full"
        style={{ perspective: '900px' }}
      >
        {(() => {
          const positions: Record<number, number> = {}
          const imgW = getImgWidth(selectedIndex)
          positions[selectedIndex] = (containerWidth - imgW) / 2

          let rightEdge = positions[selectedIndex] + imgW + IMG_GAP
          for (let d = 1; d <= 2; d++) {
            const idx = ((selectedIndex + d) % total + total) % total
            positions[idx] = rightEdge
            rightEdge += getImgWidth(idx) + IMG_GAP
          }

          let leftEdge = positions[selectedIndex] - IMG_GAP
          for (let d = -1; d >= -2; d--) {
            const idx = ((selectedIndex + d) % total + total) % total
            leftEdge -= getImgWidth(idx)
            positions[idx] = leftEdge
            leftEdge -= IMG_GAP
          }

          return images.map((img, i) => {
            const d = getSignedDist(i, selectedIndex, total)
            if (Math.abs(d) > 2) return null

            const isActive = d === 0
            const depth = Math.abs(d) * 40
            const ry = isActive ? 0 : -d * 14
            const x = positions[i] + dragOffset

            return (
              <motion.div
                key={i}
                className="absolute top-0 left-0"
                style={{
                  height: containerHeight,
                  willChange: 'transform',
                }}
                animate={{
                  x,
                  width: getImgWidth(i),
                  z: -depth,
                  scale: isActive ? 1 : 0.92,
                  opacity: isActive ? 1 : Math.abs(d) === 1 ? 0.5 : 0,
                  rotateY: ry,
                  zIndex: isActive ? 10 : 5 - Math.abs(d),
                }}
                transition={
                  isDragging || prefersReducedMotion
                    ? NO_ANIM
                    : Math.abs(d) <= 1
                      ? SPRING
                      : SPRING_SLOW
                }
              >
                <div
                  className="w-full h-full overflow-hidden rounded-xl shadow-2xl"
                  style={{
                    boxShadow: isActive
                      ? '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08)'
                      : '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-contain hide-alt"
                    draggable={false}
                    onLoad={(e) => handleImageLoad(i, e)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
              </motion.div>
            )
          })
        })()}
      </div>

    </div>
  )

  return (
    <Wrapper {...wrapperProps}>
      {fullWidth ? (
        carousel
      ) : (
        <div className={`mx-auto max-w-7xl relative ${containerPadding}`}>
          {carousel}
          {total > 1 && showNav && (
            <>
              <MorphingArrowButton
                direction="prev"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                label="Předchozí obrázek"
                style={{ left: containerWidth < 768 ? -13 : 44 }}
              />
              <MorphingArrowButton
                direction="next"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                label="Další obrázek"
                style={{ right: containerWidth < 768 ? -13 : 44 }}
              />
            </>
          )}
          {showDots && (
            <div className="flex items-center justify-center gap-3 mt-6">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-400 ${
                    i === selectedIndex
                      ? 'bg-gold-500 w-2.5 h-2.5'
                      : 'bg-ink-500 w-2 h-2 hover:bg-ink-400'
                  }`}
                  aria-label={`Obrázek ${i + 1} z ${total}`}
                  aria-current={i === selectedIndex ? 'true' : undefined}
                />
              ))}
            </div>
          )}
          {current?.instagram && (
            <a
              href={current.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 mt-4 text-sm text-gold-400 hover:text-gold-300 transition-colors"
              aria-label="Zobrazit na Instagramu"
            >
              Původní příspěvek
            </a>
          )}
        </div>
      )}
    </Wrapper>
  )
}
