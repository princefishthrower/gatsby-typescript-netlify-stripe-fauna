import { User } from 'react-netlify-identity'

export const manageSubscription = async (user: User | undefined) => {
  if (!user) {
    // TODO: toast!
    return
  }

  // otherwise call function to create link
  try {
    const response = await fetch('/.netlify/functions/create-manage-link', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token.access_token}`
      }
    })
    const data = await response.json()
    window.location.href = data.link
  } catch (err) {
    // TODO error toast with user friendly error
  }
}
