import { useTheme } from 'next-themes'

function useAppTheme() {
  const { setTheme, theme, ...rest} = useTheme()
  
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return {setTheme, theme, toggleTheme, ...rest}
}

export default useAppTheme