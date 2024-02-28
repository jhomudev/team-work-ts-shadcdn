import db from '@/lib/prisma'
import { userInputSchema } from '@/server/schemas'
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
        username
      }
    })

    if (user) {
      return NextResponse.json<ApiResponseData>({
        ok: true,
        message: 'User fetched successfully',
        data: user
      })
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'User not found',
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
      where: {username}
    })

    if (user) {
      const validateInputData = userInputSchema.safeParse(inputData)

      if (!validateInputData.success) {
        // handle error then return
        return NextResponse.json<ApiResponse>({
          ok: false,
          message: 'Input data validation failed',
          error: validateInputData.error.issues[0].message // the first error message validated
        },{status: 400})
      } 

      const updateUser = await db.user.update({
        data: validateInputData.data,
        where: { username },
        select: {
          id: true,
          username: true,
          email: true,
          type: true
        }
      })

      if (updateUser) {
        return NextResponse.json<ApiResponse>({
          ok: true,
          message: 'User updated successfully',
          data: updateUser
        })
      }

      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'User not updated',
      })
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'User not found',
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

export const DELETE = async (_req: NextRequest, { params: { username } }: Params) => {
  try {
    const user = await db.user.findUniqueOrThrow({
      where: { username }
    })

    if (user) {
      const deleteUser = await db.user.delete({
        where: { username },
        select: {
          id: true,
          username: true,
          email: true,
          type: true
        }
      })

      if (deleteUser) {
        return NextResponse.json<ApiResponse>({
          ok: true,
          message: 'User deleted successfully',
          data: deleteUser
        })
      }

      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'User not deleted',
      })
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'User not found',
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
