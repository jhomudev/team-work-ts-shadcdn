import db from '@/lib/prisma'
import { ApiResponse, ApiResponseData, DefaultFilterValues } from "@/server/types"
import { getDefaultFilterValues } from "@/server/utils"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextRequest, NextResponse } from "next/server"

const DEFAULT_VALUES: DefaultFilterValues = {
  all: false,
  page: 1,
  rowsPerPage: 10,
  order: 'desc'
}

type Params = {
  params: {
    username: string
  }
}

export const GET = async (req: NextRequest, { params: { username } }: Params ) => {
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)

  const { all, order, page ,rowsPerPage} = getDefaultFilterValues({sp, defaultValues: DEFAULT_VALUES})

  try {
    // validate if person exist
    const person = await db.user.findUniqueOrThrow({
      where: { username, type: 'PEOPLE' },
    })

    const [bookmarks, totalObtained, total] = await db.$transaction([
      db.bookmark.findMany({
        where: { peopleId: person.id },
        orderBy: {
          createdAt: order
        },
        ...(!all && {
          take: rowsPerPage,
          skip: rowsPerPage * (page - 1),
        }),
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
      }),
      db.bookmark.count({
        where: { peopleId: person.id },
      }),
      db.bookmark.count(),
    ])

    if (bookmarks) {
      return NextResponse.json<ApiResponseData>({
        ok: true,
        message: 'Bookmarks fetched successfully',
        data: bookmarks,
        meta: {
          all,
          page,
          rowsPerPage,
          total,
          totalObtained
        }
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