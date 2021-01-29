import { User } from 'netlify-identity-widget'

export interface NetlifyState {
  user: User | undefined
  isInitFinished: boolean
}

export const SET_USER = 'SET_USER'
export const SET_IS_INIT_FINISHED = 'SET_IS_INIT_FINISHED'
export const RESET_NETLIFY_STATE = 'RESET_NETLIFY_STATE'

export interface SetNetlifyUserAction {
  type: typeof SET_USER
  payload: {
    user: User | undefined
  }
}

export interface SetInitFinishedAction {
  type: typeof RESET_NETLIFY_STATE
  payload: {
    user: undefined
    isInitFinished: false
  }
}

export interface ResetNetlifyStateAction {
  type: typeof SET_IS_INIT_FINISHED
  payload: {
    isInitFinished: true
  }
}

export type NetlifyActionTypes = SetNetlifyUserAction | SetInitFinishedAction | ResetNetlifyStateAction
