import VerificationEmail from "@/components/VerificationEmail"
import { resend } from "@/lib/mail"
import { addContact } from "./resend"
import { env } from "@/lib/env"

type Props = {
  email: string
  token: string
}

export const sendVerificationEmail = async ({ email, token }: Props) => {
  try {
    const confirmLink = `${env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`
    const addEmailToContacts = await addContact({
      email,
      firstName: `firstname ${email}`,
      lastnames: `lastname ${email}`,
    })

    if (!addEmailToContacts?.success) return null
  
    const data = await resend.emails.send({
      from: `Team Work <jhonan@${env.RESEND_DOMAIN}>`,
      to: [addEmailToContacts.email],
      subject: 'Confirma tu correo',
      react: VerificationEmail({confirmLink})
    })
    return data
  } catch (error) {
    console.log({error})
    return error
  }
}