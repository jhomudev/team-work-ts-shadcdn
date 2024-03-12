import db from "@/lib/prisma"

type Props = {
  by: 'email' | 'token',
  value: string
}
export const getVerificationToken = async  ({ by = 'email', value }: Props) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email: by === 'email' ? value : undefined,
        token: by === 'token' ? value : undefined
      }
    })

    return verificationToken
  } catch (error) {
    return null
  }
}