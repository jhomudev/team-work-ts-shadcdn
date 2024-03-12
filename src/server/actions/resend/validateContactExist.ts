import { EmailResponse, listContacts } from "."

/**
 * Validate funciton if contact already exist in RESEND contacts
 * @param email email to validate if exist
 */
type ValidateContactExist = (email: string) => Promise<{
  success: true
  exist: true
  message: string
  contact: EmailResponse
} |
{
  success: true
  exist: false
  message: string
} | {
  success: false
  error?: string
}>

export const validateContactExist: ValidateContactExist = async (email) => {
  try {
    const res = await listContacts()
    if (!res.success) {
      return {
        success: false,
        error: res.error
      }
    }

    const contactExist = res.contacts?.find(contact => contact.email === email)

    if (!contactExist) {
      return {
        success: true,
        exist: false,
        message: 'Contact dont exist',
      }
    }
    
    return {
      success: true,
      exist: true,
      message: 'Contact already exist',
      contact: contactExist
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Something went wrong'
    }
  }
}