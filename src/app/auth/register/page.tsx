import { Separator } from '@/components/ui/separator'
import NetworkAuthButton from '@/modules/auth/components/NetworkAuthButton'
import RegisterForm from '@/modules/auth/components/RegisterForm'
import Link from 'next/link'
import React from 'react'
import { networksAuth } from '../login/page'

function RegisterPage() {
  return (
    <div className='w-full max-w-lg text-left mt-6 mx-auto flex flex-col gap-5'>
      <div>
        <RegisterForm />
      </div>
      <span className='text-xs'>
        ¿Ya tienes una cuenta? &nbsp;
        <Link href={"/auth/login"} className='ml-auto font-semibold text-color-cyan-soft'>Iniciar sesión</Link>
      </span>
      <div className="relative">
        <Separator />
        <span className='absolute left-1/2 -translate-x-1/2 -translate-y-2 bg-background px-5 text-xs text-muted-foreground text-center'>O</span>
      </div>
      <div className="networks flex gap-3">
        {
          networksAuth.map(n => (
            <NetworkAuthButton key={n.name} {...n} />
          ))
        }
      </div>
    </div>
  )
}

export default RegisterPage