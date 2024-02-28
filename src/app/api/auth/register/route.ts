import db from '@/lib/prisma'
import { registerInputSchema } from '@/server/schemas'
import { ApiResponse } from "@/server/types"
import { UserType } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const inputData = await req.json()

  const validateInputData = registerInputSchema.safeParse(inputData)
  if (!validateInputData.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data validation failed',
      error: validateInputData.error.issues[0].message // the first error message validated
    })
  }
  const { user, employer ,people} = validateInputData.data
  const isEmployer = user.type === UserType.EMPLOYER
  const isPeople = user.type === UserType.PEOPLE

  try {

    //validate if user exist by email or username
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email: user.email },
          { username: user.username }
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

    if(employer && isEmployer) {
      //create user
      const { password, ...rest } = user
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await db.user.create({
        data: {
          password: hashedPassword, ...rest
        }
      })

      //create employer
      const newEmployer = await db.employer.create({
        data: {
          userId: newUser.id,
          ...employer
        }
      })

      if (newUser && newEmployer) {
        return NextResponse.json<ApiResponse>({
          ok: true,
          message: 'User employer registered successfully',
          data: newUser
        })
      }
    }

    if (people && isPeople) {
      //create user
        const { password, ...rest } = user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await db.user.create({
          data: {
            password: hashedPassword, ...rest
          }
        })
  
        //create employer
        const newPeople= await db.people.create({
          data: {
            userId: newUser.id,
            ...people
          }
        })
      
        if (newUser && newPeople) {
          return NextResponse.json<ApiResponse>({
            ok: true,
            message: 'User people registered successfully',
            data: newUser
          })
        }
    }

    // TODO: SEND TOKEN EMAIL TO VERIFIED

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'User not registered'
    }, {status: 500})
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Internal server error',
        error: error.message
      }, {status: 500})
    }
  }
}