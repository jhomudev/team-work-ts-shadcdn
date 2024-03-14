import { UserRole } from '@prisma/client'
import { z } from 'zod'

export const userInputSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string'
  })
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(40, 'Username must be at most 40 characters')
    .optional(),
  email: z.string().email('Invalid email'),
  password: z.string()
    .trim()
    .min(5, 'Password must be at least 5 characters')
    .max(30, 'Password must be at most 30 characters'),
  image: z.string().url('Invalid image URL').optional(),
  role: z.nativeEnum(UserRole, {
    required_error: 'Role is required',
    invalid_type_error: 'Role must be a string',
  }),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be at most 30 characters'),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
    })
    .trim()
    .min(5, 'Description must be at least 5 characters')
    .max(100, 'Description must be at most 100 characters')
    .optional()
})

export type UserInputSchemaType = z.infer<typeof userInputSchema>