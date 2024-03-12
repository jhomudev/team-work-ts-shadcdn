import { resend } from "@/lib/mail"

export type EmailResponse = {
  id: string,
  email: string,
  first_name: string,
  last_name: string,
  created_at: string,
  unsubscribed: boolean
}

type ListContacts = () => Promise<{
  success: true
  contacts?: EmailResponse[]
} | {
  success: false
  error?: string
}>

/**
 * List contacts in resend
 * @param email email to validate if exist
 * @return resend response
 */


export const listContacts: ListContacts = async () => {
  try {
    const res = await resend.contacts.list({
      audienceId: process.env.RESEND_GENERAL_AUDIENCE_ID || '',
    })

    if (res.error) {
      return {
        success: false,
        error: res.error?.message
      }
    }

    return {
      success: true,
      contacts: res.data?.data as EmailResponse[]
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Something went wrong'
    }
  }
}