import { IMAGES } from '@/constants'
import { JobInJobs } from '@/modules/jobs/types'
import { format } from '@formkit/tempo'
import Image from 'next/image'
import Link from 'next/link'

type Props = {job: JobInJobs}

function JobCardHorizontal({job}: Props) {
  return (
    <article className='relative hover:bg-muted/10 rounded-lg'>
      <Link className='w-full h-full inset-0' href={`/panel/jobs/${job.id}`} />
      <div className="flex gap-3">
        <Image
          src={job.employer.image ?? IMAGES.companyLogo}
          alt={job.employer.name}
          className='aspect-square rounded-lg'
          width={50} height={50}
        />
        <div className="flex flex-col gap-1">
          <strong className='text-lg font-bold'>{job.title}</strong>
          <span className='text-base text-muted'>{job.time}</span>
          <p><small className='text-sm text-accent'>{job.employer.name} - { job.mode }</small></p>
        </div>
        <div className="ml-auto flex items-center">
          <time dateTime={format({date: job.createdAt, format: 'YY-MM-DD'})}  className="text-sm text-accent">{ format({date: job.createdAt, format: 'long'})}</time>
        </div>
      </div>
    </article>
  )
}

export default JobCardHorizontal