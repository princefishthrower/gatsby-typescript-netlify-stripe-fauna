const fetch = require('node-fetch')
const { sendSlackMessage } = require('./slack')

// Call Netlify Identity Admin API to update the user role
exports.updateUserRole = async (identity, netlifyID, role) => {
  try {
    await fetch(`${identity.url}/admin/users/${netlifyID}`, {
      method: 'PUT',
      headers: {
        // note that this is a special admin token for the Identity API
        Authorization: `Bearer ${identity.token}`
      },
      body: JSON.stringify({
        app_metadata: {
          roles: [role]
        }
      })
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true, roleSet: role })
    }
  } catch (error) {
    sendSlackMessage(`updateUserRole error: ${error.message}`)
    throw error
  }
}
