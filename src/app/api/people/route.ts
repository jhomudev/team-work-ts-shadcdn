import { NextRequest, NextResponse } from "next/server"
import db from '@/lib/prisma'
import { ApiResponse, ApiResponseData, DefaultFilterValues } from "@/server/types"
import { getDefaultFilterValues } from "@/server/utils"


const DEFAULT_VALUES: DefaultFilterValues = {
  all: false,
  page: 1,
  rowsPerPage: 10,
  order: 'desc'
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const sp = Object.fromEntries(searchParams)

  const { all, order, page ,rowsPerPage} = getDefaultFilterValues({sp, defaultValues: DEFAULT_VALUES})
  const search = sp.search

  try {
    const [people, totalObtained, total] = await db.$transaction([
      db.people.findMany({
        where: {
          ...(search && {
            OR: [
              { names: { contains: search, mode: 'insensitive' } },
              { lastnames: {contains: search, mode: 'insensitive'} }
            ]
          })
        },
        orderBy: {
          id: order
        },
        ...(!all && {
          take: rowsPerPage,
          skip: rowsPerPage * (page - 1),
        }),
        select: {
          id: true,
          names: true,
          lastnames: true,
          description: true,
          user: {
            select: {
              username: true,
              email: true,
              image: true,
              createdAt: true,
              updatedAt: true,
            }
          }
        }
      }),
      db.people.count({
        where: {
          ...(search && {
            OR: [
              { names: { contains: search, mode: 'insensitive' } },
              { lastnames: {contains: search, mode: 'insensitive'} }
            ]
          })
        }
      }),
      db.people.count()
    ])

    if (people) {
      return NextResponse.json<ApiResponseData>({
        ok: true,
        message: 'People fetched successfully',
        data: people,
        meta: {
          all,
          page,
          rowsPerPage,
          totalObtained,
          total
        }
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Internal server error',
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