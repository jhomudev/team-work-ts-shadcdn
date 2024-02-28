import { NextRequest, NextResponse } from "next/server"
import db from '@/lib/prisma'
import { ApiResponse, ApiResponseData, DefaultFilterValues } from "@/server/types"
import { getDefaultFilterValues } from "@/server/utils"
import { JobMode, JobStatus, JobTime, Seniority } from "@prisma/client"
import { jobInputSchema } from "@/server/schemas"

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
  // put values with ternaries, cause they can be only Enums | undefined, not simple string,
  // this is important for where cluasule query
  const time = Object.values(JobTime).includes(sp.time as JobTime) ? sp.time as JobTime : undefined
  const mode = Object.values(JobMode).includes(sp.mode as JobMode) ? sp.mode as JobMode : undefined
  const seniority = Object.values(Seniority).includes(sp.seniority as Seniority) ? sp.seniority as Seniority : undefined
  const status = Object.values(JobStatus).includes(sp.status as JobStatus) ? sp.status as JobStatus : undefined
  
  const employer = sp.employer // employer username
  const tag = sp.tag

  try {
    const [jobs, totalObtained, total] = await db.$transaction([
      db.job.findMany({
        where: {
          ...(search && {
            title: { contains: search, mode: 'insensitive' }
          }),
          mode, seniority, time, status,
          ...(tag && {tags: { has: tag }}),
          employer: { user: { username: employer } }
        },
        orderBy: {
          id: order
        },
        ...(!all && {
          take: rowsPerPage,
          skip: rowsPerPage * (page - 1),
        }),
        include: {
          employer: {
            select: {
              id: true,
              name: true,
              user: {
                select: {
                  username: true,
                }
              }
            }
          }
        }
      }),
      db.job.count({
        where: {
          ...(search && {
            title: { contains: search, mode: 'insensitive' }
          }),
          mode, seniority, time, status,
          ...(tag && {tags: { has: tag }}),
          employer: { user: { username: employer } }
        }
      }),
      db.job.count()
    ])

    if (jobs) {
      return NextResponse.json<ApiResponseData>({
        ok: true,
        message: 'Jobs fetched successfully',
        data: jobs,
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

  const validateInputData = jobInputSchema.safeParse(inputData)

  if (!validateInputData.success) {
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Input data validation failed',
      error: validateInputData.error.issues[0].message // the first error message validated
    })
  }
  
  try {
    const newJob = await db.job.create({
      data: validateInputData.data
    })

    if (newJob) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Job created successfully',
        data: newJob
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Job not created'
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