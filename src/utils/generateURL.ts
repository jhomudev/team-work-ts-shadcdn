import { ReadonlyURLSearchParams } from 'next/navigation'

type Props = {
  pathname: string | null,
  searchParams: ReadonlyURLSearchParams | null,
  newParams?: object,
  paramsDelete?: string[]
}

/**
 * Generates a URL with the given parameters.
 *
 * @param {Props} pathname - The pathname of the URL.
 * @param {Props} searchParams - The search parameters of the URL.
 * @param {Props} newParams - The new parameters to be added to the URL.
 * @param {Props} paramsDelete - The parameters to be deleted from the URL.
 * @return {string} The generated URL.
 */

function generateURL ({ pathname, searchParams, newParams, paramsDelete }: Props) {
  if (!pathname || !searchParams) return ''
  const params = new URLSearchParams(searchParams)
  if (newParams) {
    const newParamsArr = Object.entries(newParams)
    newParamsArr.forEach(([key, value]) => params.set(key, value))
  }
  paramsDelete?.forEach(param => params.delete(param))

  return `${pathname}?${params.toString()}`
}
export {generateURL}