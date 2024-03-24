'use client'
import { AppContext } from "@/context/AppContext"
import { useEffect, useState } from "react"

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  },[])

  return mounted && (
    <AppContext.Provider value={{
      openMenu,
      setOpenMenu
    }}>
      {children}
    </AppContext.Provider>
  )
}