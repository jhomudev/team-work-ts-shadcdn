import db from '@/lib/prisma'
import { ApiResponse } from "@/server/types"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'

const searchParamsSchema = z.object({
  by: z.enum(['id', 'email'], {
    invalid_type_error: 'By must be either id or email',
    required_error: 'By is required',
  }),
  value: z.string({
    required_error: 'Value is required',
    invalid_type_error: 'Value must be a string',
  }),
})

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const searchParamsObject = Object.fromEntries(searchParams)
  
  const validateSearchParams = searchParamsSchema.safeParse(searchParamsObject)

  if (!validateSearchParams.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data validation failed',
      error: validateSearchParams.error.issues[0].message // the first error message validated
    })
  }

  try {

    const {by, value} = validateSearchParams.data
    const user = await db.user.findUniqueOrThrow({
      where: {
        ...(by === 'id' ? { id: value } : { email: value })
      },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        username: true,
        name: true,
        image: true,
        role: true,
      }
    })

    if (user) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'User fetched successfully',
        data: user,
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Internal server error',
    }, {status: 500})
  } catch (error) {
    if(error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'User not found',
        error: error.message
      })
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