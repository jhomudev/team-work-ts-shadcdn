import db from '@/lib/prisma'
import { generateVerificationToken } from '@/server/actions'
import { userInputSchema } from '@/server/schemas'
import { ApiResponse } from "@/server/types"
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
  const inputData = await req.json()

  const validateInputData = userInputSchema.safeParse(inputData)
  if (!validateInputData.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data validation failed',
      error: validateInputData.error.issues[0].message // the first error message validated
    })
  }
    
    const {data} = validateInputData

    //validate if user exist by email or username
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'User already exist',
        error: 'Email or username already exist'
      })
    }

      //create user
      const { password, ...rest } = data
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await db.user.create({
        data: {
          password: hashedPassword, ...rest
        }
      })
    
    if (newUser) {
      //generate verification token
      //TODO: comentado solo para registrar usuarios sin enviar correos-> await generateVerificationToken(newUser.email)

      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'User registered successfully',
        data: newUser
      })
    }


    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'User not registered'
    }, {status: 500})
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Internal server error',
        error: error.message
      }, {status: 500})
    }
  }
}