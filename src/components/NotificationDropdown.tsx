import { IconBell } from "@tabler/icons-react"
import { Typography } from "./ui/Typography"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

type Props = {
  trigger?: React.ReactNode
}

function NotificationDropdown({ trigger = (<Button title="Notificaciones" variant={'ghost'} size={'icon'}><IconBell width={20} height={20} /></Button>) } :Props) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-screen max-w-md">
          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {
              Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <Typography variant={'mutedText'} as="span" className="text-[10px] uppercase">Frontend Developer</Typography>
                  <Typography variant={'smallText'} as="p">Magnet ha revisado tu postulacion</Typography>
                  <Typography variant={'mutedText'} as="small" className="text-sm">Hace unos momentos</Typography>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default NotificationDropdown