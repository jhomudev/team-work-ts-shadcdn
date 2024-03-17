import { Typography } from '@/components/ui/Typography'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function JobsInPanelPage() {
  return (
    <div>
      <Typography as='h3' variant="h1" >Empleos para ti</Typography>
      <div className="filters">
        {/* filters here */}
      </div>
      <Separator />
      <div className="jobs">
        {/* jobs here */}
      </div>
    </div>
  )
}

export default JobsInPanelPage