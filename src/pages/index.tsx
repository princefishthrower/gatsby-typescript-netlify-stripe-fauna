import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNetlifyIdentity } from 'react-netlify-identity-widget'
import Layout from '../components/layout/Layout'
import Constants from '../constants/Constants'

export default function IndexPage() {
  const identity = useNetlifyIdentity(Constants.NETLIFY_URL)

  const [tierStates, setTierStates] = useState<
    Array<{
      tierName: string
      tierData: {
        message: string
        src: string
      }
    }>
  >(
    Constants.TIERS.map(tierName => {
      return {
        tierName,
        tierData: {
          message: 'Log in to continue',
          src: ''
        }
      }
    })
  )
  const getSubscriptionContent = (token: string) => {
    Constants.TIERS.forEach(async type => {
      try {
        const response = await fetch('/.netlify/functions/get-protected-content', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ type })
        })
        const currentTier = tierStates.filter(tierData => tierData.tierName === type)
        const otherTiers = tierStates.filter(tierData => tierData.tierName !== type)
        if (response.status === 402) {
          if (currentTier.length > 0) {
            currentTier[0].tierData.message = 'Subscription required!'
            setTierStates([...otherTiers, ...currentTier])
          }
        } else {
          if (currentTier.length > 0) {
            const data = await response.json()
            currentTier[0].tierData.message = data.alt
            currentTier[0].tierData.src = data.src
            setTierStates([...otherTiers, ...currentTier])
          }
        }
      } catch (e) {
        // TODO: Toast
      }
    })
  }

  useEffect(() => {
    if (identity && identity.user) {
      getSubscriptionContent(identity.user.token.access_token)
    }
  }, [])

  return (
    <Layout>
      <h2>Payment tiers:</h2>
      <>
        {tierStates.map(tierState => {
          return tierState.tierData.src.length > 0 ? (
            <>
              <h3>{tierState.tierName}</h3>
              <p>{tierState.tierData.message}</p>
              <img src={tierState.tierData.src} />
            </>
          ) : (
            <>
              <h3>{tierState.tierName}</h3>
              <p>{tierState.tierData.message}</p>
            </>
          )
        })}
      </>
    </Layout>
  )
}
