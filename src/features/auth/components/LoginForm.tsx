'use client'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../actions'
import { LoginSchemaType, loginSchema } from '../schemas'

function LoginForm() {
  const { toast } = useToast()
  const searchParams =useSearchParams()
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  // NextAuth error email is not linked
  const emailUsedInOtherProvider = searchParams.get('error') === 'OAuthAccountNotLinked'

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema)
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoadingLogin(true)

    const signIn = await login(data)
    if (signIn && !signIn?.ok) {
      toast({
        title: signIn.message,
        description: signIn?.error,
      })
    }
    setIsLoadingLogin(false)
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoadingLogin} type='email' placeholder="Escribe tu correo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input disabled={isLoadingLogin} type='password' placeholder="Escribe tu contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          emailUsedInOtherProvider && (
            <Alert className='bg-destructive/30 border-destructive'>
              <AlertDescription>
                This email is already used in another provider.
              </AlertDescription>
            </Alert>
          )
        }
        <Link href={"/auth/forgot-password"} className='ml-auto text-xs font-semibold text-color-cyan-soft'>¿Olvidaste tu contraseña?</Link>
        <Button size={'lg'} className={`w-full ${ isLoadingLogin ? 'animate-bounce': 'animate-none'}`} disabled={isLoadingLogin}>Ingresar</Button>
      </form>
    </Form>
  )
}

export default LoginForm