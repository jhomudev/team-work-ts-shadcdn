import { Session } from "next-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { ExitIcon, Pencil2Icon, PersonIcon } from "@radix-ui/react-icons"
import { signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"

type Props = {
  session: Session
}

function SessionUserDropdown({ session }: Props) {
  const { user } = session
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} className="flex gap-2 items-center py-2">
          <Image
            className="rounded-full"
            src={user.image ?? '/images/user-avatar.png'}
            alt={user.name + 'avatar'}
            width={28} height={28} />
          <span className="text-sm">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href={'/profile/edit'} className="flex gap-2 items-center"><Pencil2Icon width={16} height={16}  /> Editar perfil</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href={'/profile'} className="flex gap-2 items-center"><PersonIcon width={16} height={16}  /> Ver perfil</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={async () => {
            'use server'
            await signOut()
          }}>
            <button className="flex gap-2 items-center text-destructive" type="submit">
              <ExitIcon width={16} height={16} /> Salir
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default SessionUserDropdown