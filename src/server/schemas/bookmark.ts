import { z } from "zod";

export const bookmarkInputSchema = z.object({
  peopleId: z.number({
    required_error: 'Person ID is required',
    invalid_type_error: 'Person ID must be a number'
  }).int('Person ID must be an integer'),
  jobId: z.number({
    required_error: 'Job ID is required',
    invalid_type_error: 'Job ID must be a number'
  }).int('Job ID must be an integer'),
})

export type BookmarkInputSchemaType = z.infer<typeof bookmarkInputSchema>