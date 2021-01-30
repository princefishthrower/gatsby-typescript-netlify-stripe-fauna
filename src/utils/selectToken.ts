import { AppState } from '../store/types'

export const selectToken = (state: AppState) => {
  return state.netlify.user?.token
}
