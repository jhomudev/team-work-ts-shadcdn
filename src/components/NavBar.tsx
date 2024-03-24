import Image from 'next/image'
import Link from 'next/link'
import AuthLinks from './AuthLinks'
import ThemeToggle from './ThemeToggle'
import { auth } from '@/auth'
import JobSearchInput from '@/modules/jobs/components/JobSearchInput'
import { IconMenu, IconSearch } from '@tabler/icons-react'
import { Button } from './ui/button'
import SearchModal from './SearchModal'
import MenuReponsiveButton from './MenuReponsiveButton'

const navItemsNoauth = [
  {
    id: 'home',
    label: 'Home',
    href: '/'
  },
  {
    id: 'jobs',
    label: 'Empleos',
    href: '/jobs'
  },
  {
    id: 'employers',
    label: 'Empresas',
    href: '/empleyers'
  },
  {
    id: 'persons',
    label: 'Profesionales',
    href: '/persons'
  },
]

const navItemsInAuth = [
  {
    id: 'pro',
    label: 'Coach Pro',
    href: '/'
  },
  {
    id: 'help',
    label: 'Ayuda',
    href: '/help'
  }
]

async function NavBar() {
  const session = await auth()
  const navItems = session ? navItemsInAuth : navItemsNoauth

  return (
    <header className='sticky top-0 w-full z-50 outline outline-accent bg-background'>
      <div className="px-7 h-[80px] flex gap-3 items-center">
        <MenuReponsiveButton />
        <div className="relative flex gap-1 items-center">
          <Image src={'/logo.svg'} alt="jhomudev isotipo" className='min-w-7 aspect-square' width={30} height={30} />
          <strong className="hidden lg:block text-lg font-bold">getonboard</strong>
          <a href="/" className='absolute w-full h-full' />
        </div>
        <ThemeToggle />
        <JobSearchInput />
        <nav className='flex items-center gap-3 ml-auto'>
          <ul className='hidden lg:flex items-center gap-5 text-sm text-color-cyan'>
            {
              navItems.map(item => (
                <li key={item.id} className='hover:text-color-cyan-soft text-nowrap transition-colors font-semibold'><Link href={item.href}>{ item.label }</Link></li>
              ))
            }
          </ul>
          <div>
            <AuthLinks />
          </div>
          <div>
            <SearchModal
              trigger={<Button title='Buscar' variant={'ghost'} size={'icon'} className='lg:hidden'><IconSearch width={20} height={20} /></Button>}
            />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar