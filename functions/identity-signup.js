const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { createUser } = require('./utils/fauna')

exports.handler = async event => {
  const { user } = JSON.parse(event.body)

  // create a new customer in Stripe
  const customer = await stripe.customers.create({ email: user.email })

  // subscribe the new customer to the free plan
  await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.STRIPE_FREE_PRICE_ID }]
  })

  // Store the Netlify and Stripe IDs in Fauna
  try {
    await createUser(user.id, customer.id)
    return {
      statusCode: 200,
      body: JSON.stringify({
        app_metadata: {
          roles: ['free']
        }
      })
    }
  } catch (error) {
    sendSlackMessage(`identity-signup error: ${error.message}`)
    return {
      statusCode: 500
    }
  }
}
