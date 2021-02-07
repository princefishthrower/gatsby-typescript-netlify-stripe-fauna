import INetlifyUser from '../../interfaces/INetlifyUser'
import { NetlifyActionTypes, SET_USER } from './types'

export function setUser(user: INetlifyUser | null): NetlifyActionTypes {
  return {
    type: SET_USER,
    payload: {
      user
    }
  } as const
}
