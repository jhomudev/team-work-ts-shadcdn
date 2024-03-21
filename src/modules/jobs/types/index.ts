import { BaseEntity } from "@/types"

export type JobResponse = {
  title: string
  description: string
  mode: string              
  time: string            
  openings: string       
  status: string
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
  mode: string              
  time: string            
  openings: string       
  status: string
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
  mode: string              
  time: string            
  openings: string       
  status: string
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
  mode: string              
  time: string            
  openings: string       
  status: string
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