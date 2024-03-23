import { Typography } from '@/components/ui/Typography'
import { DEFAULT_IMAGES, jobMode, jobTime } from '@/constants'
import { JobInJobs } from '@/modules/jobs/types'
import { format } from '@formkit/tempo'
import Image from 'next/image'
import Link from 'next/link'

type Props = {job: JobInJobs}

function JobCardHorizontal({job}: Props) {
  return (
    <article className='relative hover:bg-muted rounded-lg p-3'>
      <Link className='absolute w-full h-full inset-0' href={`/panel/jobs/${job.id}`} />
      <div className="flex gap-3 items-center">
        <Image
          src={job.employer.image ?? DEFAULT_IMAGES.companyLogo}
          alt={job.employer.name}
          className='aspect-square rounded-lg'
          width={50} height={50}
        />
        <div className="flex flex-col gap-1">
          <Typography as='strong' variant={'largeText'} /* className='text-lg font-bold' */>{job.title}</Typography>
          <Typography as='span' variant={'mutedText'} className='text-base'>{jobTime[job.time]}</Typography>
          <Typography as='small' variant='mutedText'>{job.employer.name} - { jobMode[job.mode] }</Typography>
        </div>
        <div className="ml-auto flex items-center">
          <Typography as='time' variant={'mutedText'}  asChild>
            <time dateTime={format({ date: job.createdAt, format: 'YY-MM-DD' })} /* className="text-base" */>{ format({date: job.createdAt, format: 'long'})}</time>
          </Typography>
        </div>
      </div>
    </article>
  )
}

export default JobCardHorizontal