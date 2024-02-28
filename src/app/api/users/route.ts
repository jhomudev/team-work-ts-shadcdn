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

  const { all, order, page, rowsPerPage } = getDefaultFilterValues({ sp, defaultValues: DEFAULT_VALUES })
  
  const search = sp.search
  const type = sp.type === 'PEOPLE' || sp.type === 'EMPLOYER' ? sp.type : undefined

  try {
    const [users, totalObtained, total] = await db.$transaction([
      db.user.findMany({
        where: {
          type,
          ...(search && {
            OR: [
              {
                employer: {name: { contains: search, mode: 'insensitive' }}
              },
              {
                people: {names: {contains: search, mode: 'insensitive'}}
              }
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
          username: true,
          email: true,
          type: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          people: {
            select: {
              id: true,
              names: true,
              lastnames: true
            }
          },
          employer: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }),
      db.user.count({
        where: {
          type,
          ...(search && {
            OR: [
              {
                employer: {name: { contains: search, mode: 'insensitive' }}
              },
              {
                people: {names: {contains: search, mode: 'insensitive'}}
              }
            ]
          })
        }
      }),
      db.user.count()
    ])

    if (users) {
      return NextResponse.json<ApiResponseData>({
        ok: true,
        message: 'Users fetched successfully',
        data: users,
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