import db from '@/lib/prisma'
import { applicationInputSchema } from '@/server/schemas/application'
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
  const sp = Object.fromEntries(searchParams)

  const { all, order, page ,rowsPerPage} = getDefaultFilterValues({sp, defaultValues: DEFAULT_VALUES})

  try {
    const [applications, totalObtained, total] = await db.$transaction([
      db.application.findMany({
        orderBy: {
          createdAt: order
        },
        ...(!all && {
          take: rowsPerPage,
          skip: rowsPerPage * (page - 1),
        }),
        select: {
          createdAt: true,
          applicant: {
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
      db.application.count(),
      db.application.count()
    ])

    if (applications) {
      return NextResponse.json<ApiResponseData>({
        ok: true,
        message: 'Applications fetched successfully',
        data: applications,
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
  const validateInputData = applicationInputSchema.safeParse(inputData)

  if (!validateInputData.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data validation failed',
      error: validateInputData.error.issues[0].message // the first error message validated
    })
  }

  try {
    const {applicantId, jobId} = validateInputData.data
    // validate if job and person exist
    await db.job.findUniqueOrThrow({
      where: { id: jobId }
    })

    await db.people.findUniqueOrThrow({
      where: { id: applicantId }
    })
    //validate if application already exist
    const applicationAlready = await db.application.findUnique({
      where: {
        applicantId_jobId: { applicantId, jobId }
      }
    })

    if (applicationAlready) {
      return NextResponse.json<ApiResponse>({
        ok: false,
        message: 'Application already exists'
      }, {status: 409})
    }
    
    //create
    const applicationCreated = await db.application.create({
      data: validateInputData.data
    })

    if (applicationCreated) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Application created successfully',
        data: applicationCreated
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Application not created'
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
  const validateInputData = applicationInputSchema.safeParse(data)

  if (!validateInputData.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data to delete validation failed',
      error: validateInputData.error.issues[0].message // the first error message validated
    })
  }

  try {
    const {applicantId, jobId} = validateInputData.data
    // validate if job and person exist
    await db.job.findUniqueOrThrow({
      where: { id: jobId }
    })

    await db.people.findUniqueOrThrow({
      where: { id: applicantId }
    })
    // validate if apllication exist
    await db.application.findUniqueOrThrow({
      where: {  
        applicantId_jobId: {
          applicantId,
          jobId
        }
      }
    })
    //delete
    const applicationDeleted = await db.application.delete({
      where: {
        applicantId_jobId: {
          applicantId,
          jobId
        }
      }
    })

    if (applicationDeleted) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Application deleted successfully',
        data: applicationDeleted
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Application not deleted'
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