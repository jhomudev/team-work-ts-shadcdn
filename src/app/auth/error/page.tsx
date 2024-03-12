import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

function AuthErrorPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          Oops! Ocurrió un error.
        </CardHeader>
        <CardContent>
          <p>Intenta de nuevo.</p>
        </CardContent>
        <CardFooter>
          <Button asChild className='mx-auto'>
            <Link href={'/auth/login'}>Volver</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AuthErrorPage