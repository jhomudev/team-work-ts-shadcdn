'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconBriefcase, IconReportMedical, IconUser, IconUserEdit, IconBookmarks } from '@tabler/icons-react'
import useAppContext from '@/hooks/useAppContext'

const menuItems = [
  {
    id: 'my-jobs',
    label: 'Empleos para ti',
    href: '/panel/jobs',
    icon: <IconBriefcase width={18} height={18} />
  },
  {
    id: 'my-applications',
    label: 'Mis postulaciones',
    href: '/panel/my-applications',
    icon: <IconReportMedical width={18} height={18} />
  },
  {
    id: 'watch-my-profile',
    label: 'Ver mi perfil',
    href: '/panel/profile',
    icon: <IconUser width={18} height={18} />
  },
  {
    id: 'edit-profile',
    label: 'Editar mi perfil',
    href: '/panel/profile/edit',
    icon: <IconUserEdit width={18} height={18} />
  },
  {
    id: 'bookmarks',
    label: 'Guardados',
    href: '/panel/profile/edit',
    icon: <IconBookmarks width={18} height={18} />
  },
]

function MenuApp() {
  const pathname = usePathname()
  const { openMenu }= useAppContext()

  return (
    <>
      <div className='hidden lg:block w-full min-w-[270px] max-w-[270px] h-[calc(100dvh_-_80px)] bg-accent px-2 py-5'>
        <nav>
          <ul className='flex flex-col gap-2'>
            {
              menuItems.map(item => {
                const isInThisItem = item.href === pathname
                const className= cn('w-full flex gap-2 items-center justify-start p-4 rounded-md', isInThisItem ? 'bg-background font-semibold' : 'bg-accent  hover:brightness-95')
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={className}
                    >
                      {item.icon} <span className='text-sm'>{item.label}</span>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </div>
      <div className={cn('fixed z-10 bottom-0 left-0 lg:hidden w-full h-[calc(100dvh_-_80px)] bg-[#2b353b66] transition-all', openMenu ? 'opacity-100 z-10' : 'opacity-0 -z-10')}>
        <div id='menu-responsive' className={cn(
          'w-full min-w-[270px] max-w-[270px] h-full bg-background px-2 py-5 transition-transform',
          openMenu ? 'translate-x-0' : '-translate-x-full',
          'shadow-lg shadow-black'
        )}>
          <nav>
            <ul className='flex flex-col gap-2'>
              {
                menuItems.map(item => {
                  const isInThisItem = item.href === pathname
                  const className= cn('w-full flex gap-2 items-center justify-start p-4 rounded-md', isInThisItem ? 'font-bold text-color-cyan-soft dark:text-color-cyan' : 'bg-background  hover:brightness-95')
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={className}
                      >
                        {item.icon} <span className='text-sm'>{item.label}</span>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default MenuApp