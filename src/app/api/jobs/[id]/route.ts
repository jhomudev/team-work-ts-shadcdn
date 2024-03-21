import db from '@/lib/prisma'
import { jobInputSchema } from '@/server/schemas'
import { ApiResponse, ApiResponseData } from "@/server/types"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'

type Params = {
  params: {
    id: string
  }
} 

export const GET = async (_req: NextRequest, {params: {id}}: Params) => {
  try {
    const job = await db.job.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        openings: true,
        mode: true,
        status: true,
        tags: true,
        seniority: true,
        time: true,
        createdAt: true,
        updatedAt: true,
        employer: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        },
        _count: {
          select: {
            applications: true,
            bookmarks: true
          }
        }
      }
    })

    if (job) {
      return NextResponse.json<ApiResponseData>({
        ok: true,
        message: 'Job fetched successfully',
        data: job
      })
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Job not found',
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

export const PUT = async (req: NextRequest, { params: { id } }: Params) => {
  const inputData = await req.json()

  try {
    const job = await db.job.findUniqueOrThrow({
      where: { id },
    })

    if (job) {
      // schema without employerId, cause this field is not updatable
      const validateInputData = jobInputSchema.omit({employerId: true}).safeParse(inputData)

      if (!validateInputData.success) {
        return NextResponse.json<ApiResponse>({
          ok: false,
          message: 'Input data validation failed',
          error: validateInputData.error.issues[0].message // the first error message validated
        },{status: 400})
      } 

      const updatedJob = await db.job.update({
        data: validateInputData.data,
        where: { id: job.id }
      })

      if (updatedJob) {
        return NextResponse.json<ApiResponse>({
          ok: true,
          message: 'Job updated successfully',
          data: updatedJob
        })
      }

      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Job not updated',
      })
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Job not found',
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

export const DELETE = async (_req: NextRequest, { params: { id } }: Params) => {
  try {
    const job = await db.job.findUniqueOrThrow({
      where: { id },
    })

    if (job) {
      const deletedjob = await db.job.delete({
        where: { id: job.id }
      })

      if (deletedjob) {
        return NextResponse.json<ApiResponse>({
          ok: true,
          message: 'Job deleted successfully',
          data: deletedjob
        })
      }

      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Job not deleted',
      })
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Job not found',
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
