const fetch = require('node-fetch')

exports.createUser = async (netlifyID, stripeID) => {
  try {
    await createUserQuery(netlifyID, stripeID)
  } catch (error) {
    sendSlackMessage(`createUser error: ${error.message}`)
    throw error
  }
}

exports.getNetlifyIdByStripeID = async stripeID => {
  try {
    const result = await faunaNetlifyIDByStripeIDQuery(stripeID)
    return result.data.getUserByStripeID.netlifyID
  } catch (error) {
    sendSlackMessage(`getNetlifyIdByStripeID error: ${error.message}`)
    throw error
  }
}

exports.getStripeIDByNetlifyID = async netlifyID => {
  try {
    const result = await faunaStripeIDByNetlifyIDQuery(netlifyID)
    return result.data.getUserByNetlifyID.stripeID
  } catch (error) {
    sendSlackMessage(`getStripeIDByNetlifyID error: ${error.message}`)
    throw error
  }
}

// actual fauna fetch call
const faunaFetch = async ({ query, variables }) => {
  return await fetch('https://graphql.fauna.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
    .then(res => res.json())
    .catch(error => console.error(JSON.stringify(error, null, 2)))
}

// query wrapper for fauna query
const faunaNetlifyIDByStripeIDQuery = async stripeID => {
  return await faunaFetch({
    query: `
        query ($stripeID: ID!) {
          getUserByStripeID(stripeID: $stripeID) {
            netlifyID
          }
        }
      `,
    variables: {
      stripeID
    }
  })
}

// query wrapper for fauna query
const faunaStripeIDByNetlifyIDQuery = async netlifyID => {
  return await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID
    }
  })
}

// query wrapper for fauna setter
const createUserQuery = async (netlifyID, stripeID) => {
  return await faunaFetch({
    query: `
      mutation ($netlifyID: ID!, $stripeID: ID!) {
        createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID }) {
          netlifyID
          stripeID
        }
      }
    `,
    variables: {
      netlifyID,
      stripeID
    }
  })
}
