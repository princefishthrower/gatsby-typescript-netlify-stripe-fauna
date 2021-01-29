import { NetlifyActionTypes, SET_IS_INIT_FINISHED, SET_USER, RESET_NETLIFY_STATE } from './types'
import { User } from 'netlify-identity-widget'

export function setUser(user: User | undefined): NetlifyActionTypes {
  return {
    type: SET_USER,
    payload: {
      user
    }
  } as const
}

export function setIsInitFinished(): NetlifyActionTypes {
  return {
    type: SET_IS_INIT_FINISHED,
    payload: {
      isInitFinished: true
    }
  } as const
}

export function resetNetlifyState(): NetlifyActionTypes {
  return {
    type: RESET_NETLIFY_STATE,
    payload: {
      user: undefined,
      isInitFinished: false
    }
  } as const
}
