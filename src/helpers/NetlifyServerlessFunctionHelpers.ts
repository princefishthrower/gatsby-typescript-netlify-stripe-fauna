export const navigateToManageStripeSubscription = async (token: string) => {
  // otherwise call function to create link
  try {
    const response = await fetch('/.netlify/functions/create-manage-link', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const link = await response.json()
    window.location.href = link
  } catch (err) {
    // TODO error toast with user friendly error
  }
}

export const getSubscriptionContent = async (token: string, type: string) => {
  try {
    const response = await fetch('/.netlify/functions/get-protected-content', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ type })
    })
    const data = await response.json()
    return data
  } catch (e) {
    // TODO: Toast
    throw Error('problem getting protected content')
  }
}
