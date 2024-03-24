'use client'

import useAppContext from "@/hooks/useAppContext"
import { IconMenu } from "@tabler/icons-react"
import { useEffect } from "react"

function MenuReponsiveButton() {
  const { toggleOpen, openMenu } = useAppContext()

  return (
    <button onClick={toggleOpen} aria-label='Menu' title='Menu' className='lg:hidden p-2'><IconMenu width={30} height={30} /></button>
  )
}

export default MenuReponsiveButton