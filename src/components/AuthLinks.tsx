import { auth } from "@/auth"
import Link from "next/link"
import NotificationDropdown from "./NotificationDropdown"
import SessionUserDropdown from "./SessionUserDropdown"
import { Button } from "./ui/button"

async function AuthLinks() {
  const session = await auth()

  return (
    <div className="flex gap-3 items-center">
      {
        session ? (
          <div className="flex gap-3 items-center">
            <SessionUserDropdown session={session} />
            <NotificationDropdown />
          </div>
        ): (
          <>
            <Button variant={'outline'} asChild><Link href={'/auth/login'}>Ingresar</Link></Button>
            <Button variant={'default'} asChild><Link href={'/auth/register'}>Register</Link></Button>
          </>
        )
      }
    </div>
  )
}

export default AuthLinks