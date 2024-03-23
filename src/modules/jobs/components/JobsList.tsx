'use client'

import { useSearchParams } from "next/navigation"
import useJobs from "../hooks/useJobs"
import JobCardHorizontal from "./job-card/JobCardHorizontal"

function JobsList() {
  const searchParams = useSearchParams()
  const { error, isLoading ,jobs, data, mutate} = useJobs({searchParams})

  if (isLoading) return <p>Cargando datos...</p>
  
  if (error) return <p>Error al cargar datos</p>

  const hasJobs =jobs && jobs.length > 0

  return (
    <div className="w-full flex flex-col gap-2">
      {
        hasJobs ? (
          <ul>
            {
              jobs?.map((job) => (
                <li key={job.id}>
                  <JobCardHorizontal job={job} />
                </li>
              )) 
            }
          </ul>
        ): (
          <p>No hay empleos</p>
        )
      }
    </div>
  )
}

export default JobsList