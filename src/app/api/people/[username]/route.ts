import db from '@/lib/prisma'
import { peopleInputSchema } from '@/server/schemas'
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
        type: 'PEOPLE'
      },
      select: {
        username: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        people: {
          select: {
            id: true,
            names: true,
            lastnames: true,
            description: true
          }
        }
      }
    })

    if (user) {
      return NextResponse.json<ApiResponseData>({
        ok: true,
        message: 'Person fetched successfully',
        data: {
          id: user.people?.id,
          username: user.username,
          names: user.people?.names,
          lastnames: user.people?.lastnames,
          description: user.people?.description,
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
        message: 'Person not found',
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
        people: {
          select: {
            id: true
          }
        }
      }
    })

    if (user) {
      const validateInputData = peopleInputSchema.safeParse(inputData)

      if (!validateInputData.success) {
        // handle error then return
        return NextResponse.json<ApiResponse>({
          ok: false,
          message: 'Input data validation failed',
          error: validateInputData.error.issues[0].message // the first error message validated
        },{status: 400})
      } 

      const updatePerson = await db.people.update({
        data: validateInputData.data,
        where: { id: user.people?.id },
        select: {
          id: true,
          names: true,
          lastnames: true,
          description: true
        }
      })

      if (updatePerson) {
        return NextResponse.json<ApiResponse>({
          ok: true,
          message: 'Person updated successfully',
          data: updatePerson
        })
      }

      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Person not updated',
      })
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Person not found',
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
