import { Separator } from '@/components/ui/separator'
import LoginForm from '@/features/auth/components/LoginForm'
import NetworkAuthButton from '@/features/auth/components/NetworkAuthButton'
import Link from 'next/link'

export type NetworkAuth= {
  name: string
  label: string
  image: string
  className: string
  nextauthProvider: 'google' | 'github'
}

export const networksAuth: NetworkAuth[] = [
  {
    name: 'google',
    label: 'Google',
    image: '/images/svgs/google.svg',
    className: 'bg-accent',
    nextauthProvider: 'google'
  },
  // {
  //   name: 'linkedin',
  //   label: 'Linkedin',
  //   image: '/images/svgs/linkedin.svg',
  //   className: 'bg-accent',
  //   nextauthProvider: 'Linkedin'
  // },
  {
    name: 'github',
    label: 'Github',
    image: '/images/svgs/github.svg',
    className: 'bg-zinc-800 dark',
    nextauthProvider: 'github'
  }
]

function LoginPage() {
  return (
    <div className='w-full max-w-lg text-left mt-6 mx-auto flex flex-col gap-5'>
      <div>
        <h2 className='text-center text-lg font-medium'>Ingresa con tu email</h2>
        <LoginForm />
      </div>
      <span className=' text-xs'>
        ¿No tienes una cuenta? &nbsp;
        <Link href={"/auth/register"} className='ml-auto font-semibold text-color-cyan-soft'>Registrarse</Link>
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

export default LoginPage