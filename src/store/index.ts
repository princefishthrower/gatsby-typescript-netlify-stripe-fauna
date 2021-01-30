import { createStore, combineReducers } from 'redux'
import { AppState } from './types'
import { netlifyReducer } from './netlify/reducers'

export const appReducer = combineReducers<AppState>({
  netlify: netlifyReducer
})

console.log('creating store!')
const store = createStore(appReducer)

export default store
