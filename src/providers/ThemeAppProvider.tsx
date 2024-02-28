'use client'
import { ThemeProvider } from 'next-themes'
type Props = {
  children: React.ReactNode
}

function ThemeAppProvider({children}: Props) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem={true}
      storageKey='__team_work_theme__'
      themes={['light', 'dark']}
    >
      { children }
    </ThemeProvider>
  )
}

export default ThemeAppProvider