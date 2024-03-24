import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'

type Props = {
  children: React.ReactNode
}
function AuthLayout({ children }: Props) {
  return (
    <div className='w-full min-h-[calc(100dvh_-_84px)]'>
      <div className=" w-full h-[40dvh] min-h-[200px] bg-[url('/images/texture-dark.svg')] bg-cover bg-fixed bg-center" />
      <Card className="-mt-[30%] lg:-mt-[10%]  w-full max-w-3xl mx-auto text-center border-none">
        <CardHeader>
          <h1 className='text-3xl font-bold text-foreground'>Deja que los empleos lleguen a ti.</h1>
        </CardHeader>
        <CardDescription className='text-lg px-6'>
          Crea tu cuenta en Get on Board y encuentra empleos exclusivos en un sistema moderno e inteligente.
        </CardDescription>
        <CardContent>
          { children}
        </CardContent>
        <CardFooter>
          <p className="text-center text-xs mt-3">
          Protegemos tus datos en todo momento. Al ingresar, manifiestas tu conformidad con la versión más reciente de nuestra Política de privacidad.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AuthLayout