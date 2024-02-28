import { z } from "zod";

export const peopleInputSchema = z.object({
  names: z
    .string({
      required_error: 'Names is required',
      invalid_type_error: 'Names must be a string'
    })
    .trim()
    .min(2, 'Names must be at least 2 characters')
    .max(30, 'Names must be at most 30 characters'),
  lastnames: z
    .string({
      required_error: 'Lastnames is required',
      invalid_type_error: 'Lastnames must be a string'
    })
    .trim()
    .min(3, 'Lastnames must be at least 3 characters')
    .max(30, 'Lastnames must be at most 30 characters'),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
    })
    .trim()
    .min(5, 'Description must be at least 5 characters')
    .max(100, 'Description must be at most 100 characters'),
})

export type PeopleInputSchemaType = z.infer<typeof peopleInputSchema>