import { loadStripe } from '@stripe/stripe-js'
import { ToastHelpers } from './ToastHelpers'
import products from '../data/products'
import Constants from '../constants/Constants'

export const redirectToCheckout = async (tierName: string) => {
  const product = products.find(p => p.tierName === tierName)
  console.log(product)
  if (product && product.price_id && Constants.STRIPE_PUBLISHABLE_KEY) {
    const stripe = await loadStripe(Constants.STRIPE_PUBLISHABLE_KEY)
    if (stripe) {
      console.log(`lets get it ${Constants.URL}`)
      const { error } = await stripe.redirectToCheckout({
        mode: 'subscription',
        lineItems: [{ price: product.price_id, quantity: 1 }],
        successUrl: `${Constants.URL}?subscription-success`,
        cancelUrl: `${Constants.URL}?subscription-cancelled`
      })
      if (error) {
        console.error(error)
        const message = error.message ? error.message : 'Unknown error with the checkout process!'
        ToastHelpers.showSimple(message)
      }
    }
  }
}
