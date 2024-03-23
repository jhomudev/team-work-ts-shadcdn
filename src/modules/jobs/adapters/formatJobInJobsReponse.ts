import { JobInJobs, JobInJobsResponse } from "../types";

export const formatJobInJobsReponse = (res: JobInJobsResponse): JobInJobs => { 
  return {
    id: res.id,
    title: res.title,
    description: res.description,
    mode: res.mode,
    time: res.time,
    openings: res.openings,
    seniority: res.seniority,
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
      applications: res._count.applications
    }
  }
}