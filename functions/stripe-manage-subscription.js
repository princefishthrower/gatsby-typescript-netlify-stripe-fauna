const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { getStripeIDByNetlifyID } = require('./utils/fauna')

exports.handler = async (event, context) => {
  const { user } = context.clientContext
  const netlifyID = user.sub

  // get stripe id from netlify ID
  const stripeID = await getStripeIDByNetlifyID(netlifyID)

  const link = await stripe.billingPortal.sessions.create({
    customer: stripeID,
    return_url: `${process.env.URL}?from=subscription-management`
  })

  return {
    statusCode: 200,
    body: JSON.stringify(link.url)
  }
}
