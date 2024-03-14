import { z } from "zod";

export const bookmarkInputSchema = z.object({
  peopleId: z.string({
    required_error: 'Job id is required',
    invalid_type_error: 'Job id must be a string'
  })
  .trim()
  .min(5, 'Job id must be at least 5 characters')
  .max(50, 'Job id must be at most 50 characters'),
  jobId: z.string({
    required_error: 'Job id is required',
    invalid_type_error: 'Job id must be a string'
  })
  .trim()
  .min(5, 'Job id must be at least 5 characters')
  .max(50, 'Job id must be at most 50 characters'),
})

export type BookmarkInputSchemaType = z.infer<typeof bookmarkInputSchema>