import { Alert, AlertDescription } from '@/components/ui/alert'
import { verifyEmailByToken } from '@/features/auth/services'
import { redirect } from 'next/navigation'

type Props = {
  params: any,
  searchParams: {token?: string}
}

async function VerifyEmailPage({searchParams } : Props) {
  const { token } = searchParams

  if (!token) redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login`)

  const res = await verifyEmailByToken(token)

  if (!res?.ok) {
    return (
      <div>
        <p>Ocurrió un error, no se pudo validar el correo.</p>
        <p>{res?.error}</p>
      </div>
    )
  }

  return (
    <div className='w-full min-h-[300px] grid place-items-center'>
      <Alert className='border-green-500 bg-green-300'>
        <AlertDescription>
          <p>Verificación exitosa</p>
          <small>{ res.message }</small>
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default VerifyEmailPage