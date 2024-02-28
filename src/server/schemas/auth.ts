import { z } from "zod";
import { employerInputSchema, peopleInputSchema, userInputSchema } from ".";

export const registerInputSchema = z.object({
  user: userInputSchema,
  people: peopleInputSchema.optional(),
  employer: employerInputSchema.optional()
}).superRefine((data, ctx) => {
  if (data.user.type === 'EMPLOYER' && !data.employer) {
    ctx.addIssue({
      code: 'custom',
      message: 'You need to provide person data',
    })
  }
  if (data.user.type === 'PEOPLE' && !data.people) {
    ctx.addIssue({
      code: 'custom',
      message: 'You need to provide employer data',
    })
  }
})

export type RegisterInputSchemaType = z.infer<typeof registerInputSchema>