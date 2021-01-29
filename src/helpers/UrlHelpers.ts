import URLSearchParamKeys from '../enums/URLSearchParamKeys'
import URLSearchParamValues from '../enums/URLSearchParamValues'

export const shouldForceRefresh = (search: string) => {
  const searchParams = new URLSearchParams(search)
  const value = searchParams.get(URLSearchParamKeys.FROM)
  return value && Object.keys(URLSearchParamValues).includes(value) ? true : false
}
