import { Job, JobResponse } from "../types"

export const formaJobResponse = (res: JobResponse): Job => { 
  return {
    id: res.id,
    title: res.title,
    description: res.description,
    mode: res.mode,
    time: res.time,
    openings: res.openings,
    status: res.status,
    tags: res.tags,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
    employer: {
      id: res.employer.id,
      name: res.employer.name,
      username: res.employer.username,
      image: res.employer.image
    },
    _count: {
      applications: res._count.applications,
      bookmarks: res._count.bookmarks
    }
  } 
}