import { env } from '@/lib/env'
import { fetcher } from '@/lib/swr'
import { ApiResponseData } from '@/server/types'
import { ReadonlyURLSearchParams } from 'next/navigation'
import useSWR, { SWRConfiguration } from 'swr'
import { formatJobInJobsReponse } from '../adapters'
import { JobInJobsResponse } from '../types'

type Props = {
  searchParams: ReadonlyURLSearchParams | URLSearchParams
  swrConfig: SWRConfiguration
}

/**
 * Hook that make fetch jobs with SWR. If the response is ok, return formated jobs
 * @param {object} Props
 * @param {object} Props.swrConfig SWR configuration
 * @param {ReadonlyURLSearchParams | URLSearchParams} Props.searchParams search params
 * @returns return data, isLoading, error and mutate, also return jobs if the response is ok
 */

function useJobs({ searchParams, swrConfig = { keepPreviousData: true } }: Props) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponseData<JobInJobsResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/jobs?${searchParams.toString()}`, fetcher, swrConfig)

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
    error,
  }
}

export default useJobs