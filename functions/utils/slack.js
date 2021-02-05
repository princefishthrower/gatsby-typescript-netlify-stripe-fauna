const fetch = require('node-fetch')

// Sends a Slack message to the webhook defined in env vars (if provided)
exports.sendSlackMessage = message => {
  if (process.env.SLACK_WEBHOOK_URL) {
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: message
      })
    })
  }
}
