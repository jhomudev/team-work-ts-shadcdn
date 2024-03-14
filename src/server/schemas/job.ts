import { JobMode, JobStatus, JobTime, Seniority } from "@prisma/client";
import { z } from "zod";

export const jobInputSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    })
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(50, 'Title must be at most 50 characters'),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
    })
    .trim()
    .min(10, 'Description must be at least 5 characters')
    .max(5000, 'Description must be at most 5000 characters'),
  tags: z
    .string({
      required_error: 'Tags are required',
      invalid_type_error: 'Tags must be a string'
    })
    .trim()
    .min(2, 'Each tag must be at least 2 characters')
    .max(15, 'Each tag must be at most 15 characters')
    .array()
    .min(1, 'Tags minimum of 1')
    .max(10, 'Tags maximum of 10')
    .nonempty('Tags are required'),
  openings: z.
    number({
      required_error: 'Openings is required',
      invalid_type_error: 'Openings must be a number'
    })
    .int('Openings must be an integer')
    .positive('Openings invalid, must be positive')
    .default(1),
  employerId: z
    .string({
      required_error: 'Employer id is required',
      invalid_type_error: 'Employer id must be a string'
    })
    .trim()
    .min(5, 'Employer id must be at least 5 characters')
    .max(50, 'Employer id must be at most 50 characters'),
  mode: z.nativeEnum(JobMode, {
    required_error: 'Mode is required',
    invalid_type_error: 'Mode must be a string',
  }),
  time: z.nativeEnum(JobTime, {
    required_error: 'Time is required',
    invalid_type_error: 'Time must be a string',
  }),
  seniority: z.nativeEnum(Seniority, {
    required_error: 'Seniority is required',
    invalid_type_error: 'Seniority must be a string',
  }),
  status: z.nativeEnum(JobStatus, {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string',
  }),
})


export type JobInputSchemaType = z.infer<typeof jobInputSchema>