// TODO: should be moved to Fauna DB
const content = {
  free: {
    content: 'Here is some super awesome FREE content!',
    message: 'To view this content, you need to create an account!',
    allowedRoles: ['free', 'pro', 'premium']
  },
  pro: {
    content: 'Here is some super awesome PRO content!',
    message: 'This is protected content! It’s only available if you have a pro plan or higher.',
    allowedRoles: ['pro', 'premium']
  },
  premium: {
    content: 'Here is some super awesome PREMIUM content!',
    message: 'This is protected content! It’s only available if you have the premium plan.',
    allowedRoles: ['premium']
  }
}

exports.handler = async (event, context) => {
  const { type } = JSON.parse(event.body)
  const { user } = context.clientContext
  if (user) {
    const roles = user.app_metadata.roles
    const { allowedRoles } = content[type]

    if (!roles || !roles.some(role => allowedRoles.includes(role))) {
      return {
        statusCode: 402,
        body: JSON.stringify({
          src: 'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1592618179/stripe-subscription/subscription-required.jpg',

          message: `This content requires a ${type} subscription.`,
          upgradeTo: type
        })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(content[type])
    }
  }
}
