import { NextRequest, NextResponse } from "next/server"
import db from '@/lib/prisma'
import { ApiResponse, ApiResponseData, DefaultFilterValues } from "@/server/types"
import { getDefaultFilterValues } from "@/server/utils"
import { JobMode, JobStatus, JobTime, Seniority } from "@prisma/client"
import { jobInputSchema } from "@/server/schemas"
import { validateEnumValue } from "@/utils"

const DEFAULT_VALUES: DefaultFilterValues = {
  all: false,
  page: 1,
  rowsPerPage: 10,
  order: 'desc'
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const searchParamsObject = Object.fromEntries(searchParams)

  const { all, order, page, rowsPerPage } = getDefaultFilterValues({ searchParams: searchParamsObject, defaultValues: DEFAULT_VALUES })
  
  const search = searchParamsObject.search
  // validaet if values is in enums, this is important for where cluasule query
  const time = validateEnumValue({enumObj: JobTime, value: searchParamsObject.time}) as JobTime | undefined
  const mode = validateEnumValue({enumObj: JobMode, value: searchParamsObject.mode}) as JobMode | undefined
  const seniority = validateEnumValue({enumObj: Seniority, value: searchParamsObject.seniority}) as Seniority | undefined
  const status = validateEnumValue({enumObj: JobStatus, value: searchParamsObject.status})  as JobStatus | undefined
  
  const employer = searchParamsObject.employer // employer username
  const tag = searchParamsObject.tag

  try {
    const [jobs, totalObtained, total] = await db.$transaction([
      db.job.findMany({
        where: {
          ...(search && {
            title: { contains: search, mode: 'insensitive' }
          }),
          mode, seniority, time, status,
          ...(tag && {tags: { has: tag }}),
          employer: { username: employer }
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
          title: true,
          description: true,
          mode: true,              
          time: true,            
          openings: true,       
          status: true,
          seniority: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
          employer: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true
            }
          },
          _count: {
            select: {
              applications: true
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
          employer: { username: employer }
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