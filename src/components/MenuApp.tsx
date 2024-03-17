'use client'
import { cn } from '@/lib/utils'
import { BackpackIcon, BookmarkIcon, FilePlusIcon, Pencil2Icon, PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    id: 'my-jobs',
    label: 'Empleos para ti',
    href: '/panel/jobs',
    icon: <BackpackIcon width={16} height={16} />
  },
  {
    id: 'my-applications',
    label: 'Mis postulaciones',
    href: '/panel/my-applications',
    icon: <FilePlusIcon width={16} height={16} />
  },
  {
    id: 'watch-my-profile',
    label: 'Ver mi perfil',
    href: '/panel/profile',
    icon: <PersonIcon width={16} height={16} />
  },
  {
    id: 'edit-profile',
    label: 'Editar mi perfil',
    href: '/panel/profile/edit',
    icon: <Pencil2Icon width={16} height={16} />
  },
  {
    id: 'bookmarks',
    label: 'Guardados',
    href: '/panel/profile/edit',
    icon: <BookmarkIcon width={16} height={16} />
  },
]

function MenuApp() {
  const pathname = usePathname()

  return (
    <div className='w-full max-w-[250px] h-[calc(100dvh_-_84px)] bg-muted p-2'>
      <nav>
        <ul className='flex flex-col gap-2'>
          {
            menuItems.map(item => {
              const isInThisItem = item.href === pathname
              const className= cn('w-full flex gap-2 items-center justify-start p-3 rounded-md', isInThisItem ? 'bg-background font-semibold' : 'bg-muted  hover:brightness-95')
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
  )
}

export default MenuApp