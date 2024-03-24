'use client'
import { DialogProps } from '@radix-ui/react-alert-dialog'
import { IconSearch } from '@tabler/icons-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { generateURL } from '@/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
  trigger?: React.ReactNode,
  options?: DialogProps
}

function SearchModal({ trigger = (<Button title="Search" variant={'ghost'} size={'icon'}><IconSearch width={20} height={20} /></Button>), options }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => { 
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search')

    if(!search) return

    const url = generateURL({
      pathname, 
      searchParams,
      newParams: { search: search as string },
    })
    setOpen(false)
    replace(url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} {...options}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              type='search'
              name='search'
              placeholder='Buscar...'
            />
          </div>
          <Button type='submit' variant={'ghost'} size={'icon'}>
            <IconSearch width={20} height={20} />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal