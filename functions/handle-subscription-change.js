const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { getNetlifyIdByStripeID } = require('./utils/fauna')
const { updateUserRole } = require('./utils/updateUserRole')
const { sendSlackMessage } = require('./utils/slack')

exports.handler = async ({ body, headers }, context) => {
  const { identity, user } = context.clientContext
  try {
    // make sure this event was sent legitimately.
    const stripeEvent = stripe.webhooks.constructEvent(body, headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET)

    // bail if this is not a subscription update event
    if (stripeEvent.type !== 'customer.subscription.updated') return

    // Get stripeID and nickname from subscription - the role IS the nickname!
    const stripeID = stripeEvent.data.object.customer
    const role = stripeEvent.data.object.items.data[0].plan.nickname

    // then get corresponding netlify ID from fauna
    const netlifyID = await getNetlifyIdByStripeID(stripeID)

    // update the user role on Netlify
    await updateUserRole(identity, user, netlifyID)

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true, roleSet: role })
    }
  } catch (error) {
    sendSlackMessage(`Stripe handle subscription change webhook error: ${error.message}`)
    return {
      statusCode: 400,
      body: `Stripe handle subscription change webhook error: ${error.message}`
    }
  }
}
