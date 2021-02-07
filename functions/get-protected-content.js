// TODO: should be moved to Fauna DB
const content = {
  free: {
    content: 'Here is some super awesome FREE content!',
    allowedRoles: ['free', 'pro', 'premium']
  },
  pro: {
    content: 'Here is some super awesome PRO content!',
    allowedRoles: ['pro', 'premium']
  },
  premium: {
    content: 'Here is some super awesome PREMIUM content!',
    allowedRoles: ['premium']
  }
}

exports.handler = async (event, context) => {
  const { type } = JSON.parse(event.body)
  const { allowedRoles } = content[type]
  const { user } = context.clientContext
  if (user) {
    const roles = user.app_metadata.roles
    if (!roles || !roles.some(role => allowedRoles.includes(role))) {
      return {
        statusCode: 402,
        body: JSON.stringify({
          content: `This content requires a ${type} subscription.`,
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
