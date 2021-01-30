import INetlifyUser from '../../interfaces/INetlifyUser'

export interface NetlifyState {
  user: INetlifyUser | undefined
  isInitFinished: boolean
  isRedirectingToManage: boolean
}

export const SET_USER = 'SET_USER'
export const SET_IS_INIT_FINISHED = 'SET_IS_INIT_FINISHED'
export const RESET_NETLIFY_STATE = 'RESET_NETLIFY_STATE'
export const SET_IS_REDIRECTING_TO_MANAGE = 'SET_IS_REDIRECTING_TO_MANAGE'

export interface SetNetlifyUserAction {
  type: typeof SET_USER
  payload: {
    user: INetlifyUser | undefined
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

export interface IsRedirectingToManageAction {
  type: typeof SET_IS_REDIRECTING_TO_MANAGE
  payload: {
    isRedirectingToManage: boolean
  }
}

export type NetlifyActionTypes = SetNetlifyUserAction | SetInitFinishedAction | ResetNetlifyStateAction | IsRedirectingToManageAction
