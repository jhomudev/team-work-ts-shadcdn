import { useTheme } from 'next-themes'

function useAppTheme() {
  const { setTheme, theme, ...props} = useTheme()
  
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return {setTheme, theme, toggleTheme, ...props}
}

export default useAppTheme