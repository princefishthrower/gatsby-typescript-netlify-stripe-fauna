import { ToastHelpers } from './ToastHelpers'
import netlifyIdentity, { User } from 'netlify-identity-widget'
import { setUser } from '../store/netlify/actions'
import store from '../store'
import { clearNavigationParamFromWindow, isNavigationFromSubscriptionSite } from './UrlSearchParamHelpers'
import { sleep } from '../utils/sleep'
import INetlifyUser from '../interfaces/INetlifyUser'
import jwtDecode from 'jwt-decode'

// open the modal to the login tab
export const login = () => {
  netlifyIdentity.open('login')
}

// logout
export const logout = () => {
  netlifyIdentity.logout()
}

// open the modal to the signup tab
export const signUp = () => {
  netlifyIdentity.open('signup')
}

netlifyIdentity.on('login', () => {
  onLogin()
})

netlifyIdentity.on('logout', () => {
  store.dispatch(setUser(null))
  netlifyIdentity.close()
  ToastHelpers.showSimple('👍 Successfully logged out. 👍')
})

const onLogin = async () => {
  const token = await getToken()
  const user = convertNetlifyTokenToUserObject(token)
  store.dispatch(setUser(user))
  netlifyIdentity.close()
}

const getToken = async (): Promise<string> => {
  // check the window search params to see if we have returned from a path where the
  // user's subscription state has changed
  const shouldForceRefresh = isNavigationFromSubscriptionSite()
  // if it is such a return, wait a few seconds for the data in identity to propagate
  if (shouldForceRefresh) {
    ToastHelpers.showSimple('✅ Checking for any change to your subscription...')
    await sleep(5000)
    clearNavigationParamFromWindow()
    ToastHelpers.showSimple('👍 Your subscription settings have been refreshed! Enjoy!')
  }
  // then refresh the token!
  return await netlifyIdentity.refresh(shouldForceRefresh)
}

export const convertNetlifyTokenToUserObject = (token: string): INetlifyUser => {
  const data = jwtDecode<INetlifyUser>(token)
  return {
    token,
    user_metadata: {
      avatar_url: data.user_metadata.avatar_url ? data.user_metadata.avatar_url : '',
      full_name: data.user_metadata.full_name
    },
    app_metadata: {
      roles: data.app_metadata.roles
    }
  }
}

// Other goodies not used
// netlifyIdentity.on('init', user => console.log('init', user))
// netlifyIdentity.on('open', () => console.log('Widget opened'))
// netlifyIdentity.on('close', () => console.log('Widget closed'))
// Unbind from events
// netlifyIdentity.off('login') // to unbind all registered handlers
// netlifyIdentity.off('login', handler) // to unbind a single handler
// refresh the user's JWT
// Note: this method returns a promise.
// netlifyIdentity.refresh().then(jwt => console.log(jwt))
