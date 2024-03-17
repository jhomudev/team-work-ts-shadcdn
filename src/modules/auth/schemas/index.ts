import { z } from "zod";

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

export const registerSchema = z.object({
  name: z
    .string({
      required_error: 'Names is required',
      invalid_type_error: 'Names must be a string'
    })
    .trim()
    .min(2, 'Names must be at least 2 characters')
    .max(30, 'Names must be at most 30 characters'),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email('Invalid email'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    }),
  confirmPassword: z
    .string({
      required_error: 'Confirm password is required',
      invalid_type_error: 'Confirm password must be a string'
    })
}).refine(data => data.password === data.confirmPassword, {
  message: "The passwords must match.",
  path: ["confirmPassword"], // This sets which field the error is attached to
});

export type RegisterSchemaType = z.infer<typeof registerSchema>