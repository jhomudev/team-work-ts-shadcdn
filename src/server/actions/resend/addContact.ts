import { resend } from '@/lib/mail';
import { Resend } from 'resend';
import { z } from 'zod';
import { validateContactExist } from '.';

const schemaContact = z.object({
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required'
  }).email('Invalid email'),
  firstName: z.string({
    invalid_type_error: 'First name must be a string',
    required_error: 'First name is required'
  })
    .trim()
    .min(2, 'First name is required')
    .max(40, 'First name must be at most 40 characters'),
  lastnames: z.string({
    invalid_type_error: 'First name must be a string',
    required_error: 'First name is required'
  })
    .trim()
    .min(2, 'First name is required')
    .max(40, 'First name must be at most 40 characters'),
  unsubscribed: z.boolean({
    invalid_type_error: 'Unsubscribed must be a boolean',
  }).default(false).optional()
})

type Props = z.infer<typeof schemaContact>

type AddContact = (data: Props) => Promise<{
  success: true
  message: string
  email: string
} | {
  success: false
  error?: string
}>

/**
 * Add person email (contact) to audience from RESEND API
 * @param contactData contact data
 * @returns resend response or error message validation
 */


export const addContact: AddContact = async (contactData: Props) => {
  const validateData = schemaContact.safeParse(contactData)
  if (!validateData.success) {
    return {
      success: false,
      error: validateData.error.issues[0].message
    }
  }
  
  try {
    const { data } = validateData
    const validateIfExistContact = await validateContactExist(data.email)

    if (!validateIfExistContact.success) {
      return {
        success: false,
        error: validateIfExistContact.error
      }
    }

    if (!validateIfExistContact.exist) {
      const res = await resend.contacts.create({
        ...data,
        audienceId: process.env.RESEND_GENERAL_AUDIENCE_ID as string,
      })
      
      if (res.data) {
        return {
          success: true,
          email: data.email,
          message: 'Contact added successfully'
        }
      }
      
      return {
        success: false,
        error: res.error?.message
      }
    }
    
    return {
      success: true,
      email: data.email,
      message: validateIfExistContact.message || 'Contact already exist'
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Something went wrong'
    }
  }
}

