import { NetlifyActionTypes, NetlifyState, SET_USER } from './types'

export const initialState: NetlifyState = {
  user: null
}

export function netlifyReducer(state = initialState, action: NetlifyActionTypes): NetlifyState {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user
      }
    default:
      return state
  }
}
