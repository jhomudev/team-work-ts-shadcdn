'use client'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { jobMode, jobTime, seniority } from "@/constants"
import { generateURL } from "@/utils"
import { JobMode, JobTime, Seniority } from "@prisma/client"
import { IconRestore } from "@tabler/icons-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type Props = {}

function JobsFilters({ }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSelectValueInFilter = (val: string, filter: string) => {
    const url = generateURL({
      pathname,
      searchParams,
      newParams: { [filter]: val },
      paramsDelete: !val ? [filter] : undefined
    })
    replace(url)
  }

  return (
    <div className="flex gap-3 flex-wrap w-full">
      <Select key={`seniority${searchParams.toString()}`} defaultValue={searchParams.get("seniority") ?? undefined} onValueChange={(val) => handleSelectValueInFilter(val, "seniority")}>
        <SelectTrigger className="w-fit min-w-[140px]">
          <SelectValue placeholder="Nivel de experiencia" />
        </SelectTrigger>
        <SelectContent>
            {
              Object.values(Seniority).map((item) => (
                <SelectItem key={item} value={item}>{seniority[item]}</SelectItem>
              ))
            }
        </SelectContent>
      </Select>
      <Select key={`mode${searchParams.toString()}`} defaultValue={searchParams.get("mode") ?? undefined} onValueChange={(val) => handleSelectValueInFilter(val, "mode")}>
        <SelectTrigger className="w-fit min-w-[140px]">
          <SelectValue placeholder="Modalidad" />
        </SelectTrigger>
          <SelectContent>
            {
              Object.values(JobMode).map((item) => (
                <SelectItem key={item} value={item}>{jobMode[item]}</SelectItem>
              ))
            }
        </SelectContent>
      </Select>
      <Select key={`time${searchParams.toString()}`} defaultValue={searchParams.get("time") ?? undefined} onValueChange={(val) => handleSelectValueInFilter(val, "time")}>
        <SelectTrigger className="w-fit min-w-[140px]">
          <SelectValue placeholder="Tiempo" />
        </SelectTrigger>
          <SelectContent>
            {
              Object.values(JobTime).map((item) => (
                <SelectItem key={item} value={item}>{jobTime[item]}</SelectItem>
              ))
            }
        </SelectContent>
      </Select>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'ghost'} size={"icon"} onClick={() => {
              replace(generateURL({ pathname, searchParams, paramsDelete: ["seniority", "mode", "time"] }))
            }} > <IconRestore width={20} height={20} />  </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restart filters</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default JobsFilters