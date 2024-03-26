'use client'

import useAppContext from "@/hooks/useAppContext"
import { IconMenu } from "@tabler/icons-react"

function MenuReponsiveButton() {
  const { toggleOpen } = useAppContext()

  return (
    <button onClick={toggleOpen} aria-label='Menu' title='Menu' className='lg:hidden p-2'><IconMenu width={30} height={30} /></button>
  )
}

export default MenuReponsiveButton