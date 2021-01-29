import { NetlifyActionTypes, NetlifyState, RESET_NETLIFY_STATE, SET_IS_INIT_FINISHED, SET_USER } from './types'

export const initialState: NetlifyState = {
  user: undefined,
  isInitFinished: false
}

export function netlifyReducer(state = initialState, action: NetlifyActionTypes): NetlifyState {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user
      }
    case SET_IS_INIT_FINISHED:
      return {
        ...state,
        isInitFinished: action.payload.isInitFinished
      }
    case RESET_NETLIFY_STATE:
      return {
        ...state,
        user: action.payload.user,
        isInitFinished: action.payload.isInitFinished
      }
    default:
      return state
  }
}