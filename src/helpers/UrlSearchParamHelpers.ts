import URLSearchParamKeys from '../enums/URLSearchParamKeys'
import URLSearchParamValues from '../enums/URLSearchParamValues'

// examines the page URL for matching values in URLSearchParamValues
// If found, this means we have come from a change in subscription
// and need to force a JWT refresh to get the newest user role
export const isNavigationFromSubscriptionSite = () => {
  const search = typeof window !== 'undefined' ? window.location.search : ''
  const searchParams = new URLSearchParams(search)
  const value = searchParams.get(URLSearchParamKeys.FROM)
  return value && Object.keys(URLSearchParamValues).includes(value) ? true : false
}

// resets the window URL with
export const clearNavigationParamFromWindow = () => {
  if (typeof window !== 'undefined') {
    window.history.replaceState('', '', `${window.location.pathname}`)
  }
}
