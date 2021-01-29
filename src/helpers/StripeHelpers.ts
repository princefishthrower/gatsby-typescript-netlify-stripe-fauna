import { loadStripe } from '@stripe/stripe-js'
import { ToastHelpers } from './ToastHelpers'
import products from '../data/products'
import env from '../env/.env.json'

export const redirectToCheckout = async (tierName: string) => {
  const product = products.find(p => p.tierName === tierName)
  if (product && product.price_id && env.STRIPE_PUBLISHABLE_KEY) {
    const stripe = await loadStripe(env.STRIPE_PUBLISHABLE_KEY)
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        mode: 'subscription',
        lineItems: [{ price: product.price_id, quantity: 1 }],
        successUrl: `${env.URL}?subscription-success`,
        cancelUrl: `${env.URL}?subscription-cancelled`
      })
      if (error) {
        console.error(error)
        const message = error.message ? error.message : 'Unknown error with the checkout process!'
        ToastHelpers.showSimple(message)
      }
    }
  }
}
