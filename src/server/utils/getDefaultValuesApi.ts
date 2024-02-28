import { DefaultFilterValues } from "../types"

export type getDefaultFilterValuesProps = {
  sp: { [k: string]: string }
  defaultValues: DefaultFilterValues
}
export const getDefaultFilterValues = ({ sp, defaultValues }: getDefaultFilterValuesProps) => { 
  const all = sp.all === 'true'
  const page = Number(sp.page) || defaultValues.page
  const rowsPerPage = Number(sp.rowsPerPage) || defaultValues.rowsPerPage
  const order = ((sp.order === 'asc' || sp.order === 'desc') ? sp.order : defaultValues.order ) satisfies 'asc' | 'desc'

  return {
    all,
    page,
    rowsPerPage,
    order
  }
}