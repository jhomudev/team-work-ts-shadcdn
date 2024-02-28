import { z } from "zod";

export const applicationInputSchema = z.object({
  applicantId: z.number({
    required_error: 'Applicant ID is required',
    invalid_type_error: 'Applicant ID must be a number'
  }).int('Applicant ID must be an integer'),
  jobId: z.number({
    required_error: 'Job ID is required',
    invalid_type_error: 'Job ID must be a number'
  }).int('Job ID must be an integer'),
})

export type ApplicationInputSchemaType = z.infer<typeof applicationInputSchema>