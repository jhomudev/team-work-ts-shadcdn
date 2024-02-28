'use client'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useAppTheme from "@/hooks/useAppTheme"
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

function ThemeToggle() {
  const { setTheme, theme: currentTheme, themes } = useAppTheme()
  const [mounted, setMounted] = useState(false)

  const themeItems = themes.map(theme => ({
    theme,
    icon: theme === 'light' ? <SunIcon /> : theme === 'dark' ? <MoonIcon /> :<DesktopIcon />  ,
  }))

  useEffect(() => {
    setMounted(true)
  },[])

  return mounted && (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button aria-label="Cambiar tema" title="Cambiar tema" className="p-3">
            {themeItems.find(theme => theme.theme === currentTheme)?.icon }  
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {
            themeItems.map(({ icon, theme})=> (
              <DropdownMenuCheckboxItem
                key={theme}
                checked={theme === currentTheme}
                className="capitalize flex items-center gap-2"
                onCheckedChange={(checked) => checked && setTheme(theme)}
              >
                {icon}
                {theme}
              </DropdownMenuCheckboxItem>
            ))
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ThemeToggle