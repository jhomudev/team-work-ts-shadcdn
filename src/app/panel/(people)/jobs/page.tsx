import { Typography } from '@/components/ui/Typography'
import { Separator } from '@/components/ui/separator'
import JobsList from '@/modules/jobs/components/JobsList'
import React from 'react'

function JobsInPanelPage() {
  return (
    <div>
      <Typography as='h3' variant="h1" className='mb-3' >Empleos para ti</Typography>
      <div className="filters">
        {/* filters here */}
      </div>
      <Separator />
      <div className="w-full">
        <JobsList />
      </div>
    </div>
    // TODO: Insert fake data in employers users, jobs, IS NECESARY
  )
}

export default JobsInPanelPage