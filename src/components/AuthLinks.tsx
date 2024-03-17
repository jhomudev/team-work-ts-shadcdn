import { auth, signOut } from "@/auth"
import { Button } from "./ui/button"
import Link from "next/link"
import SessionUserDropdown from "./SessionUserDropdown"

async function AuthLinks() {
  const session = await auth()
  return (
    <div className="flex gap-3 items-center">
      {
        session ? (
          <form action={async () => {
            'use server'
            await signOut()
          }}>
            <SessionUserDropdown session={session} />
          </form>
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