import { ToastHelpers } from './ToastHelpers'
import netlifyIdentity, { User } from 'netlify-identity-widget'
import { setIsInitFinished, setUser } from '../store/netlify/actions'
import store from '../store'

netlifyIdentity.on('init', (user: User | null) => {
  store.dispatch(setIsInitFinished())
  if (user) {
    store.dispatch(setUser(user))
  }
})

// events
netlifyIdentity.on('login', (user: User) => {
  store.dispatch(setUser(user))
  netlifyIdentity.close()
  const welcomeMessage = user.user_metadata.full_name ? `😄 Welcome back, ${user.user_metadata.full_name}! 😄` : '😄 Welcome back! 😄'
  ToastHelpers.showSimple(welcomeMessage)
})

netlifyIdentity.on('logout', () => {
  store.dispatch(setUser(undefined))
  netlifyIdentity.close()
  ToastHelpers.showSimple('👍 Successfully logged out. 👍')
})

// netlifyIdentity.on('error', err => {
//   ToastHelpers.showSimple(
//     '😱 Uh oh! There was an error with Netlify Identity! (The login and authentication service.) Please try again and contact us if the error continues! 😱'
//   )
// })

export const init = () => {
  netlifyIdentity.init()
}

// open the modal to the login tab
export const login = () => {
  netlifyIdentity.open('login')
}

// logout
export const logout = () => {
  netlifyIdentity.logout()
}

// open the modal to the signup tab
export const signup = () => {
  netlifyIdentity.open('signup')
}

export const refreshJwt = async (forceRefresh: boolean = false) => {
  console.log('force is:' + forceRefresh)
  return await netlifyIdentity.refresh(forceRefresh)
}
// Other goodies not yet used
// netlifyIdentity.on('init', user => console.log('init', user))
// netlifyIdentity.on('open', () => console.log('Widget opened'))
// netlifyIdentity.on('close', () => console.log('Widget closed'))
// Unbind from events
// netlifyIdentity.off('login') // to unbind all registered handlers
// netlifyIdentity.off('login', handler) // to unbind a single handler
// refresh the user's JWT
// Note: this method returns a promise.
// netlifyIdentity.refresh().then(jwt => console.log(jwt))
