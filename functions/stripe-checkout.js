const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { faunaFetch } = require('./utils/fauna')

exports.handler = async (event, context) => {
  const { user } = context.clientContext

  const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.sub
    }
  })

  const { stripeID } = result.data.getUserByNetlifyID

  const session = await stripe.checkout.sessions.create({
    customer: stripeID,
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA']
    },
    success_url: `${process.env.URL}/?from=subscription-success`,
    cancel_url: `${process.env.URL}/?from=subscription-cancel`,
    mode='subscription',
    line_items: [
      { price: product.price_id, quantity: 1}
    ]
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY_NETLIFY
    })
  }
}
