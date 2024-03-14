import { DefaultFilterValues } from "../types"

export type getDefaultFilterValuesProps = {
  searchParams: { [k: string]: string }
  defaultValues: DefaultFilterValues
}
export const getDefaultFilterValues = ({ searchParams, defaultValues }: getDefaultFilterValuesProps) => { 
  const all = searchParams.all === 'true'
  const page = Number(searchParams.page) || defaultValues.page
  const rowsPerPage = Number(searchParams.rowsPerPage) || defaultValues.rowsPerPage
  const order = ((searchParams.order === 'asc' || searchParams.order === 'desc') ? searchParams.order : defaultValues.order ) satisfies 'asc' | 'desc'

  return {
    all,
    page,
    rowsPerPage,
    order
  }
}