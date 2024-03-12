import db from "@/lib/prisma"
import { getVerificationToken, sendVerificationEmail } from "."

export const generateVerificationToken = async (email: string) => { 
  try {
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000) // 1 hour
    const token = crypto.randomUUID()

    const existingToken = await getVerificationToken({ by: 'email', value: email })

    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id
        }
      })
    }

    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        expires,
        token
      }
    })

    if (verificationToken) {
      await sendVerificationEmail({
        email: verificationToken.email,
        token: verificationToken.token
      })
    }

    return verificationToken
  } catch (error) {
    return null
  }
}