import db from '@/lib/prisma'
import { bookmarkInputSchema } from '@/server/schemas'
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

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const searchParamsObject = Object.fromEntries(searchParams)

  const { all, order, page ,rowsPerPage} = getDefaultFilterValues({searchParams: searchParamsObject, defaultValues: DEFAULT_VALUES})

  try {
    const [bookmarks, totalObtained, total] = await db.$transaction([
      db.bookmark.findMany({
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
              name: true,
              username: true
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
      db.bookmark.count(),
      db.bookmark.count()
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

export const POST = async (req: NextRequest) => {
  const inputData = await req.json()

  //validate input data
  const validateInputData = bookmarkInputSchema.safeParse(inputData)

  if (!validateInputData.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data validation failed',
      error: validateInputData.error.issues[0].message // the first error message validated
    })
  }

  try {
    const {peopleId, jobId} = validateInputData.data
    // validate if job and person exist
    await db.job.findUniqueOrThrow({
      where: { id: jobId }
    })

    await db.user.findUniqueOrThrow({
      where: { id: peopleId }
    })
    //validate if bookmark already exist
    const bookmarkAlready = await db.bookmark.findUnique({
      where: {
        peopleId_jobId: { peopleId, jobId }
      }
    })

    if (bookmarkAlready) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Bookmark already exists'
      }, {status: 409})
    }

    //create
    const bookmarkCreated = await db.bookmark.create({
      data: validateInputData.data
    })

    if (bookmarkCreated) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Bookmark created successfully',
        data: bookmarkCreated
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Bookmark not created'
    },{status: 500})
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

export const DELETE = async (req: NextRequest) => {
  const data = await req.json()

  //validate data to delete
  const validateInputData = bookmarkInputSchema.safeParse(data)

  if (!validateInputData.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data to delete validation failed',
      error: validateInputData.error.issues[0].message // the first error message validated
    })
  }

  try {
    const {peopleId, jobId} = validateInputData.data
    // validate if job and person exist
    await db.job.findUniqueOrThrow({
      where: { id: jobId }
    })

    await db.user.findUniqueOrThrow({
      where: { id: peopleId }
    })
    // validate if apllication exist
    await db.bookmark.findUniqueOrThrow({
      where: {  
        peopleId_jobId: {
          peopleId,
          jobId
        }
      }
    })
    //delete
    const bookmarkDeleted = await db.bookmark.delete({
      where: {
        peopleId_jobId: { peopleId, jobId }
      }
    })

    if (bookmarkDeleted) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Bookmark deleted successfully',
        data: bookmarkDeleted
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Bookmark not deleted'
    },{status: 500})
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