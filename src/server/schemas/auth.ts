import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .trim()
    .min(2, 'Password is required')
    .email('Invalid email'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
    .trim()
    .min(2, 'Password is required')
})

export type LoginSchemaType = z.infer<typeof loginSchema>

export const verifyEmailInputSchema = z.object({
  token: z
    .string({
      required_error: 'Token is required',
      invalid_type_error: 'Token must be a string'
    })
    .trim()
    .min(2, 'Token is required')
})

export type verifyEmailInputType = z.infer<typeof verifyEmailInputSchema>