import { cn } from '@/lib/utils'
import { IconSearch } from '@tabler/icons-react'

type Props = {
  icon?: React.ReactNode
  placeholder?: string
  onPressEnter?: (value: string) => void
  onValueChange?: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

function SearchInput({
  icon = <IconSearch width={20} height={20} />,
  placeholder = 'Write something',
  onValueChange,
  onPressEnter,
  className,
  ...props
}: Props) {

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => { 
    e.preventDefault()
    if (!onPressEnter) return
    
    const formData = new FormData(e.currentTarget)
    const valueSearch = formData.get('search')
    onPressEnter(valueSearch as string)
  }

  return (
    <form onSubmit={handleSubmit} className={cn(`flex gap-3 items-center rounded-md py-1 px-2 bg-accent text-accent-foreground w-full max-w-sm ${className}`)}>
      <div className="icon">
        {icon}
      </div>
      <input
        type="search"
        name="search"
        className={`bg-transparent w-full outline-none`}
        placeholder={placeholder} {...props}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => onValueChange && onValueChange((e.target).value)}
      />
      <button type="submit" hidden></button>
    </form>
  )
}
export default SearchInput