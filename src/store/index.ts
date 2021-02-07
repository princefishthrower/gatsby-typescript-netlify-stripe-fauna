import { createStore, combineReducers } from 'redux'
import { AppState } from './types'
import { netlifyReducer } from './netlify/reducers'
import netlifyIdentity from 'netlify-identity-widget'
import { setUser } from './netlify/actions'
import { convertNetlifyTokenToUserObject } from '../helpers/NetlifyIdentityHelpers'

export const appReducer = combineReducers<AppState>({
  netlify: netlifyReducer
})

const store = createStore(appReducer)

if (typeof document !== 'undefined') {
  netlifyIdentity.on('init', netlifyUser => {
    if (netlifyUser && netlifyUser.token) {
      const user = convertNetlifyTokenToUserObject(netlifyUser.token.access_token)
      store.dispatch(setUser(user))
    }
  })

  netlifyIdentity.init()
}

export default store
