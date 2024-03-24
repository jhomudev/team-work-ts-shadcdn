import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import JobsFilters from '@/modules/jobs/components/JobsFilters'
import JobsList from '@/modules/jobs/components/JobsList'

function JobsInPanelPage() {
  return (
    <div className='w-full flex gap-10'>
      <div className='w-full mx-auto md:max-w-5xl pt-10 flex flex-col xl:flex-row gap-10'>
        <div className='flex-1'>
          <Typography as='h3' variant="h1" className='mb-5' >Empleos para ti</Typography>
          <div className="filters">
            <JobsFilters />
          </div>
          <br />
          <main className="w-full">
            <JobsList />
          </main>
        </div>
        <aside className="w-full xl:max-w-[250px] flex flex-wrap justify-center md:justify-start xl:flex-col gap-5">
          <Card className='max-w-[250px]' style={{backgroundImage: 'linear-gradient(225deg, rgba(147, 61, 184, 0.25) 0, rgba(0, 196, 245, 0.25) 20%, rgba(0, 196, 245, 0.01) 100%)'}}>
            <CardHeader className='flex justify-center items-center'>
              <picture>
                <img
                  src="https://d2dgum4gsvdsrq.cloudfront.net/assets/coach_pro/pro-hat-cb923a920f929530e62cc3409a0474435df1ab48103a378810e7879e6e04141f.png"
                  alt="gap pro"
                  className='aspect-auto object-cover w-[150px] h-full'
                />
              </picture>
            </CardHeader>
            <CardContent className='text-left flex flex-col'>
              <Typography as='strong' variant={'h4'} className='mb-2' >Coach Pro</Typography>
              <Typography as='p' variant={'mutedText'} >Descubre tendencias salariales exclusivas para tu perfil.</Typography>
            </CardContent>
            <CardFooter>
              <Button variant={'outline'} size={'lg'} className='bg-transparent hover:bg-accent'>Obtén Coach Pro</Button>
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-3 md:max-w-[200px]">
            <Typography as='p' variant={'p'} className='text-sm text-center md:text-left' >¿Te gustaría poder importar postulaciones de otras plataformas?</Typography>
            <Button variant={'outline'} size={'lg'}>Sí, mantenme al tanto</Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default JobsInPanelPage