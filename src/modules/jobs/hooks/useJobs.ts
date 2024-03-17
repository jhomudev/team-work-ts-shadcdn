import { fetcher } from '@/lib/swr'
import useSWR from 'swr'
function useJobs() {
  const { data, error, isLoading, mutate } = useSWR('', fetcher, {
    fallback: {},
    revalidateOnFocus: true,
    keepPreviousData: true
  })

  if (error) {
    console.log('Error while fetching jobs')
    console.log({ error })
    return {isLoading, error}
  }

  const jobs = data?.data

  return {
    jobs,
    isLoading,
    mutate
  }
}

export default useJobs