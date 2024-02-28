import { z } from "zod";

export const employerInputSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    })
    .trim()
    .min(5, 'Name must be at least 5 characters')
    .max(30, 'Name must be at most 30 characters'),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
    })
    .trim()
    .min(5, 'Description must be at least 5 characters')
    .max(500, 'Description must be at most 500 characters'),
})

export type EmployerInputSchemaType = z.infer<typeof employerInputSchema>