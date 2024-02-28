import { UserType } from '@prisma/client'
import { z } from 'zod'

export const userInputSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string'
  })
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username must be at most 15 characters'),
  email: z.string().email('Invalid email'),
  password: z.string()
    .trim()
    .min(5, 'Password must be at least 5 characters')
    .max(30, 'Password must be at most 30 characters'),
  image: z.string().url('Invalid image URL').optional(),
  type: z.nativeEnum(UserType, {
    required_error: 'Type is required',
    invalid_type_error: 'Type must be a string',
  })
})

export type UserInputSchemaType = z.infer<typeof userInputSchema>