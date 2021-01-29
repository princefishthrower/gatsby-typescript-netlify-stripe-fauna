import { NetlifyState, NetlifyActionTypes } from './netlify/types'

// This is the entire App state
export type AppState = {
  netlify: NetlifyState
}

export type RootActionTypes = NetlifyActionTypes
