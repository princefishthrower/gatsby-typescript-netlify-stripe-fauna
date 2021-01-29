import { loadStripe } from '@stripe/stripe-js'
import { refreshJwt } from './NetlifyIdentityHelpers'
import { ToastHelpers } from './ToastHelpers'

export const navigateToManageStripeSubscription = async (forceRefresh: boolean) => {
  // otherwise call function to create link
  try {
    const token = await refreshJwt(forceRefresh)
    const response = await fetch('/.netlify/functions/stripe-manage-subscription', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const link = await response.json()
    window.location.href = link
  } catch (err) {
    // TODO error toast with user friendly error
  }
}

export const navigateToStripeCheckout = async (price_id: string) => {
  try {
    const token = await refreshJwt()
    const response = await fetch('/.netlify/functions/stripe-checkout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        price_id
      })
    })
    const data = await response.json()
    const stripe = await loadStripe(data.STRIPE_PUBLISHABLE_KEY)
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      })
      if (error) {
        console.error(error)
        const message = error.message ? error.message : 'Unknown error with the checkout process!'
        ToastHelpers.showSimple(message)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const getSubscriptionContent = async (type: string, forceRefresh: boolean) => {
  try {
    const token = await refreshJwt(forceRefresh)
    const response = await fetch('/.netlify/functions/get-protected-content', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ type })
    })
    const data = await response.json()
    return data
  } catch (e) {
    // TODO: Toast
    throw Error('problem getting protected content')
  }
}
