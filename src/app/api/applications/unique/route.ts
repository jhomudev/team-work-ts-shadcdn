import db from '@/lib/prisma'
import { ApiResponse } from "@/server/types"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'

const schema = z.object({
  job: z.string({
    required_error: 'Job id is required',
    invalid_type_error: 'Job id must be a string',
  })
    .trim()
    .min(5, 'Job id must be at least 5 characters')
    .max(50, 'Job id must be at most 50 characters'),
  person: z.string({
    required_error: 'Person id is required',
    invalid_type_error: 'Person id must be a string',
  })
    .trim()
    .min(5, 'Person id must be at least 5 characters')
    .max(50, 'Person id must be at most 50 characters'),
})

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const searchParamsObject = Object.fromEntries(searchParams)

  const validateSearchParams = schema.safeParse(searchParamsObject)

  if (!validateSearchParams.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data validation failed',
      error: validateSearchParams.error.issues[0].message // the first error message validated
    })
  }

  const { job, person } = validateSearchParams.data

  try {
    // validate if job and person exist
    await db.job.findUniqueOrThrow({
      where: { id: job }
    })

    await db.user.findUniqueOrThrow({
      where: { id: person }
    })

    const application =  await db.application.findUniqueOrThrow({
      where: {
        applicantId_jobId: {
          applicantId: person,
          jobId: job
        }
      },
      select: {
        createdAt: true,
          applicant: {
            select: {
              id: true,
              name: true,
              username: true
            }
          },
          job: {
            select: {
              id: true,
              title: true,
              description: true
            }
          }
      }
    })

    return NextResponse.json<ApiResponse>({
      ok: true,
      message: 'Application fetched successfully',
      data: application
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Data not found',
        error: error.message
      }, {status: 404})
    }

    if (error instanceof Error) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Internal server error',
        error: error.message
      }, {status: 500})
    }
  }
}