import { BaseEntity } from "@/types"
import { JobMode, JobStatus, JobTime, Seniority } from "@prisma/client"

export type JobResponse = {
  title: string
  description: string
  mode: JobMode              
  time: JobTime            
  openings: number
  seniority: Seniority
  status: JobStatus
  tags: string[]
  employer: {
    id: string
    username: string
    name: string,
    image?: string
  },
  _count: {
    applications: number,
    bookmarks: number
  }
} & BaseEntity

export type JobInJobsResponse = {
  title: string
  description: string
  mode: JobMode              
  time: JobTime            
  openings: number
  seniority: Seniority
  status: JobStatus
  tags: string[]
  employer: {
    id: string
    username: string
    name: string,
    image?: string
  },
  _count: {
    applications: number
  }
} & BaseEntity

export type Job = {
  title: string
  description: string
  mode: JobMode              
  time: JobTime            
  openings: number
  seniority: Seniority
  status: JobStatus
  tags: string[]
  employer: {
    id: string
    username: string
    name: string,
    image?: string
  },
  _count: {
    applications: number
    bookmarks: number
  }
} & BaseEntity

export type JobInJobs = {
  title: string
  description: string
  mode: JobMode              
  time: JobTime            
  openings: number
  seniority: Seniority
  status: JobStatus
  tags: string[]
  employer: {
    id: string
    username: string
    name: string,
    image?: string
  },
  _count: {
    applications: number
  }
} & BaseEntity