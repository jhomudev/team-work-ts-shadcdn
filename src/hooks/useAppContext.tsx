import { AppContext } from "@/context/AppContext"
import { useContext } from "react"

function useAppContext() {
  const {openMenu, setOpenMenu} = useContext(AppContext)

  const toggleOpen = () => setOpenMenu(!openMenu)

  return {toggleOpen, openMenu, setOpenMenu}
}

export default useAppContext