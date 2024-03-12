import db from "@/lib/prisma"
import { getVerificationToken } from "@/server/actions"
import { verifyEmailInputSchema } from "@/server/schemas"
import { ApiResponse } from "@/server/types"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const inputData = await req.json()

  const validateInputData = verifyEmailInputSchema.safeParse(inputData)

  if (!validateInputData.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data validation failed',
      error: validateInputData.error.issues[0].message // the first error message validated
    })
  }

  const {token} = validateInputData.data

  try {
    const verificationToken = await getVerificationToken({ by: 'token', value: token })

    if(verificationToken?.expires && verificationToken.expires < new Date()) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Token expired',
        error: 'Token expired'
      })
    }

    //verify if user has already been verified
    const userEmailIsAlreadyVerified = await db.user.findUnique({
      where: {
        email: verificationToken?.email,
        NOT: { emailVerified: null }
      }
    })

    if (userEmailIsAlreadyVerified) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Email already verified',
        error: 'Email already verified'
      })
    }

    const userEmailVerificated = await db.user.update({
      where: {
        email: verificationToken?.email
      },
      data: {
        emailVerified: new Date()
      }
    })

    if (userEmailVerificated.emailVerified) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Email verified successfully',
        data: userEmailVerificated
      })
    }
    
  } catch (error) {
    if(error instanceof Error) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Internal server error',
        error: error.message
      }, {status: 500})
    }
  }
}