import { fetcher } from '@/lib/swr'
import useSWR, { KeyedMutator } from 'swr'
import { JobInJobs, JobInJobsResponse } from '../types'
import { formatJobInJobsReponse } from '../adapters'
import { ApiResponseData } from '@/server/types'
import { env } from '@/lib/env'


function useJobs() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponseData<JobInJobsResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/jobs`, fetcher, {
    fallback: {},
    revalidateOnFocus: true,
    keepPreviousData: true
  })

  if (error) {
    console.log('Error while fetching jobs')
    console.log({ error })
  }

  const jobs = data?.data.map((job) => formatJobInJobsReponse(job))

  return {
    jobs,
    data,
    isLoading,
    mutate,
    error
  }
}

export default useJobs