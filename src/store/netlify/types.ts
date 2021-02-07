import INetlifyUser from '../../interfaces/INetlifyUser'

export interface NetlifyState {
  user: INetlifyUser | null
}

export const SET_USER = 'SET_USER'

export interface SetUserAction {
  type: typeof SET_USER
  payload: {
    user: INetlifyUser | null
  }
}

export type NetlifyActionTypes = SetUserAction
