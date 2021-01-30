import { loadStripe } from '@stripe/stripe-js'
import store from '../store'
import { setIsRedirectingToManage } from '../store/netlify/actions'
import { selectToken } from '../utils/selectToken'
import { ToastHelpers } from './ToastHelpers'

export const navigateToManageStripeSubscription = async () => {
  // otherwise call function to create link
  try {
    const token = selectToken(store.getState())
    const response = await fetch('/.netlify/functions/stripe-manage-subscription', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setIsRedirectingToManage(false)
    const link = await response.json()
    window.location.href = link
  } catch (err) {
    // TODO error toast with user friendly error
  }
}

export const navigateToStripeCheckout = async (tierName: string) => {
  try {
    const token = selectToken(store.getState())
    const response = await fetch('/.netlify/functions/stripe-checkout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        tierName
      })
    })
    const data = await response.json()
    const stripe = await loadStripe(data.publishableKey)
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

export const getSubscriptionContent = async (type: string) => {
  try {
    const token = selectToken(store.getState())
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
