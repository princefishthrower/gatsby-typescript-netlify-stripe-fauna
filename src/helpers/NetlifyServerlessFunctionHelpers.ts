import Constants from '../constants/Constants'
import store from '../store'
import { setIsRedirectingToManage } from '../store/netlify/actions'
import { selectToken } from '../utils/selectToken'
import { ToastHelpers } from './ToastHelpers'

export const navigateToManageStripeSubscription = async () => {
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
    ToastHelpers.showSimple('😧 Unknown error navigating to the Stripe subscription dashboard! Are you logged in? 😧')
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
    // Make sure this is handled in the caller!
    throw Error('problem getting protected content')
  }
}

const getMessage = (data: any) => {
  if (data.error.code === Constants.STRIPE_ERROR_CODE_RESOURCE_MISSING) {
    return `For one-click subscription changes, you'll need to add at least one payment method. Click the 'Manage Subscription" button to add a payment method!`
  }
  return `An unknown error occurred when we tried to update your subscription. Please try the "Manage Subscription" button above.`
}
