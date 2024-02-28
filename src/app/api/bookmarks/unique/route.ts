import db from '@/lib/prisma'
import { ApiResponse } from "@/server/types"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)

  const job = sp.job // job id
  const person = sp.person // person people id

  if (!job || !person) {
    return NextResponse.json<ApiResponse>({ ok: false, message: 'Job or person undefined' })
  }

  try {
    // validate if job and person exist
    const jobExist =  await db.job.findUniqueOrThrow({
      where: { id: Number(job) }
    })

    const personExist =  await db.people.findUniqueOrThrow({
      where: { id: Number(person) }
    })

    const bookmark =  await db.bookmark.findUniqueOrThrow({
      where: {
        peopleId_jobId: {
          peopleId: personExist.id,
          jobId: jobExist.id
        }
      },
      select: {
        createdAt: true,
          people: {
            select: {
              id: true,
              names: true,
              lastnames: true,
              user: {
                select: {
                  username: true
                }
              }
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
      message: 'Bookmark fetched successfully',
      data: bookmark
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