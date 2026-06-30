import { createContext, useContext, type ReactNode } from 'react'

interface AppContextValue {
  requestIntro: () => void
}

const AppContext = createContext<AppContextValue>({
  requestIntro: () => {},
})

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider value={{ requestIntro: () => {} }}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  return useContext(AppContext)
}
