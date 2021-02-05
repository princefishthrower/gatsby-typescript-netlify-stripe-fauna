import INetlifyUser from '../../interfaces/INetlifyUser'
import { NetlifyActionTypes, SET_IS_INIT_FINISHED, SET_USER, RESET_NETLIFY_STATE, SET_IS_REDIRECTING_TO_MANAGE } from './types'

export function setUser(user: INetlifyUser | undefined): NetlifyActionTypes {
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

export function setIsRedirectingToManage(isRedirectingToManage: boolean): NetlifyActionTypes {
  return {
    type: SET_IS_REDIRECTING_TO_MANAGE,
    payload: {
      isRedirectingToManage
    }
  } as const
}
