import db from '@/lib/prisma'
import { employerInputSchema } from '@/server/schemas'
import { ApiResponse, ApiResponseData } from "@/server/types"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextRequest, NextResponse } from "next/server"

type Params = {
  params: {
    username: string
  }
} 

export const GET = async (_req: NextRequest, {params: {username}}: Params) => {
  try {
    const user = await db.user.findUniqueOrThrow({
      where: {
        username,
        type: 'EMPLOYER'
      },
      select: {
        username: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        employer: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    if (user) {
      return NextResponse.json<ApiResponseData>({
        ok: true,
        message: 'Employer fetched successfully',
        data: {
          id: user.employer?.id,
          username: user.username,
          name: user.employer?.name,
          description: user.employer?.description,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      })
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Employer not found',
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

export const PUT = async (req: NextRequest, { params: { username } }: Params) => {
  const inputData = await req.json()

  try {
    const user = await db.user.findUniqueOrThrow({
      where: { username },
      select: {
        employer: {
          select: {
            id: true
          }
        }
      }
    })

    if (user) {
      const validateInputData = employerInputSchema.safeParse(inputData)

      if (!validateInputData.success) {
        // handle error then return
        return NextResponse.json<ApiResponse>({
          ok: false,
          message: 'Input data validation failed',
          error: validateInputData.error.issues[0].message // the first error message validated
        },{status: 400})
      } 

      const updateEmployer = await db.employer.update({
        data: validateInputData.data,
        where: { id: user.employer?.id },
        select: {
          id: true,
          name: true,
          description: true
        }
      })

      if (updateEmployer) {
        return NextResponse.json<ApiResponse>({
          ok: true,
          message: 'Employer updated successfully',
          data: updateEmployer
        })
      }

      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Employer not updated',
      })
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Employer not found',
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
