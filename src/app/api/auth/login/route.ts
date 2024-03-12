import db from '@/lib/prisma'
import { loginSchema } from '@/server/schemas'
import { AuthSignInResponse } from "@/server/types"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const validateFields = loginSchema.safeParse(body)

  if (!validateFields.success) {
    return NextResponse.json<AuthSignInResponse>({
      success: false,
      message: 'Input data validation failed',
      error: validateFields.error.issues[0].message
    })
  }
  try {
    const {  email, password } = validateFields.data
    const user = await db.user.findUniqueOrThrow({
      where: { email }
    })

    if (user) {
      const isValidPassword = await bcrypt.compare(password, (user.password || ''))

      if (!isValidPassword) {
        return NextResponse.json<AuthSignInResponse>({
          success: false,
          message: 'Credentials do not match',
          error: 'Password is incorrect'
        })
      }

      //validate if email is verified
      if (!user.emailVerified) {
        return NextResponse.json<AuthSignInResponse>({
          success: false,
          message: 'Email not verified',
          error: 'Please verify your email'
        })
      }

      return NextResponse.json<AuthSignInResponse>({
        success: true,
        message: 'Login successful',
        session: user
      })
    }
  } catch (error) {
    if(error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json<AuthSignInResponse>({
        success: false,
        message: 'User not exist',
        error: error.message
      }, {status: 404})
    }

    if (error instanceof Error) {
      return NextResponse.json<AuthSignInResponse>({
        success: false,
        message: 'Internal server error',
        error: error.message
      }, {status: 500})
    }
  }
}