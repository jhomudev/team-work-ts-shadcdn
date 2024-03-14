import React from 'react'
import ThemeToggle from './ThemeToggle'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

function NavBar() {
  return (
    <header className='border-b border-accent'>
      <div className="px-7 h-[80px] flex gap-3 items-center">
        <div className="relative flex gap-1 items-center">
          <Image src={'/logo.svg'} alt="jhomudev isotipo" width={30} height={30} />
          <strong className="text-lg font-bold">getonboard</strong>
          <a href="/" className='absolute w-full h-full' />
        </div>
        <ThemeToggle />
        <nav className='flex items-center gap-5 ml-auto'>
          <ul className='flex items-center gap-3 text-sm text-color-cyan'>
            <li className='hover:text-color-cyan-soft font-semibold'><Link href={'/'}>Home</Link></li>
            <li className='hover:text-color-cyan-soft font-semibold'><Link href={'/employers'}>Empleadores</Link></li>
            <li className='hover:text-color-cyan-soft font-semibold'><Link href={'/people'}>Profesionales</Link></li>
          </ul>
          <div className="flex gap-3 items-center">
            <Button variant={'outline'} asChild><Link href={'/auth/login'}>Ingresar</Link></Button>
            <Button variant={'default'} asChild><Link href={'/auth/register'}>Register</Link></Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar