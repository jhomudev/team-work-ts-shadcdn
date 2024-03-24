'use client'
import SearchInput from '@/components/SearchInput'
import { generateURL } from '@/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {}

function JobSearchInput({ }: Props) {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const handleSearch = (value: string) => {
    if(!value) replace('/jobs')
    const url = generateURL({
      pathname,
      searchParams,
      newParams: { search: value },
      paramsDelete: !value ? ['search'] : undefined
    })
    replace(`${url}`)
  }

  return (
    <SearchInput
      className='hidden lg:flex'
      placeholder='Buscar empleos...'
      onPressEnter={handleSearch}
      defaultValue={searchParams.get("search") ?? undefined}
    />
  )
}

export default JobSearchInput