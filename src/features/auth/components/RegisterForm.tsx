'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RegisterSchemaType, registerSchema } from '../schemas'
import { UserRole } from '@prisma/client'
import {registerUser} from '../services'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'

function RegisterForm() {
  const { toast } = useToast()
  const [isLoadingRegister, setIsLoadingRegister] = useState(false)
  const [confirmRegister, setConfirmRegister] = useState(false)

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema)
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoadingRegister(true)
    const dataToSend = {
      email: data.email,
      name: data.name,
      password: data.password,
      username: data.name.replace(' ', '').toLowerCase() + Date.now(),
      role: UserRole.PEOPLE
    }

    const res = await registerUser(dataToSend)
    setIsLoadingRegister(false)

    if (res?.ok) {
      setConfirmRegister(true)
      return
    }

    toast({
      title: 'Ocurrió un error',
      description: res?.error,
      variant: 'destructive'
    })
  })

  
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input disabled={isLoadingRegister} placeholder="Escribe tus nombres" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoadingRegister} type='email' placeholder="Escribe tu correo" {...field} />
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
                <Input disabled={isLoadingRegister} type='password' placeholder="Escribe tu contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <FormItem>
              <FormLabel>Confirmación de contraseña</FormLabel>
              <FormControl>
                <Input disabled={isLoadingRegister} type='password' placeholder="Escribe de nuevo tu contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          confirmRegister && (
            <Alert className='border-green-500 bg-green-100'>
              <AlertDescription>
                We send you an email, verify it.
              </AlertDescription>
            </Alert>
          )
        }
        <Button size={'lg'} className={`w-full mt-3 ${isLoadingRegister ? 'animate-bounce' : 'animate-none'}`} disabled={isLoadingRegister} type="submit">Registrarse</Button>
      </form>
    </Form>
  )
}

export default RegisterForm