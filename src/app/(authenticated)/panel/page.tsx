import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

async function PanelPage() {
  const session = await auth()
  
  return (
    <div>
      session <br />

      <pre>

      {
        JSON.stringify(session, null, 2)
      }
      </pre>

      <form action={async () => {
        'use server'
        await signOut()
      }}
      >
        <Button>Sign out</Button>
      </form>
    </div>
  )
}

export default PanelPage