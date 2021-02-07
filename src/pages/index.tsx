import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/layout/Layout'
import Constants from '../constants/Constants'
import { AppState } from '../store/types'
import { ToastHelpers } from '../helpers/ToastHelpers'
import { graphql, Link } from 'gatsby'
import { Loader } from '../components/loader/Loader'
import { getSubscriptionContent, navigateToManageStripeSubscription } from '../helpers/NetlifyServerlessFunctionHelpers'

const Index = ({ data }) => {
  const { user, isInitFinished } = useSelector((state: AppState) => state.netlify)

  const [tierStates, setTierStates] = useState<
    Array<{
      tierName: string
      tierData: {
        message: string
        content: string
        upgradeTo: string
      }
    }>
  >(
    Constants.TIERS.map(tierName => {
      return {
        tierName,
        tierData: {
          message: 'Log in to continue',
          content: '',
          upgradeTo: ''
        }
      }
    })
  )

  const getTierData = async () => {
    if (user) {
      Constants.TIERS.forEach(async tierName => {
        try {
          const data = await getSubscriptionContent(tierName)
          const currentTier = tierStates.filter(tierData => tierData.tierName === tierName)
          const otherTiers = tierStates.filter(tierData => tierData.tierName !== tierName)
          if (currentTier.length > 0) {
            currentTier[0].tierData.message = data.message
            currentTier[0].tierData.content = data.content
            currentTier[0].tierData.upgradeTo = data.upgradeTo
            setTierStates([...otherTiers, ...currentTier])
          }
        } catch (error) {
          ToastHelpers.showSimple('😯 There was an error retrieving subscription content! Please refresh the page. 😯')
        }
      })
    }
  }

  useEffect(() => {
    getTierData()
  }, [user])

  const getRestOfPageContent = () => {
    if (!isInitFinished) {
      return <Loader />
    }

    if (isInitFinished && !user) {
      return <b>You need to log in to view the rest of the content on this page.</b>
    }

    return (
      <>
        <h2>Payment tiers:</h2>

        {tierStates.map(tierState => {
          return (
            <React.Fragment key={tierState.tierName}>
              <h3>{tierState.tierName}</h3>
              <p>{tierState.tierData.message}</p>
              <p>{tierState.tierData.content}</p>
              {tierState.tierData.upgradeTo && (
                <button onClick={() => navigateToManageStripeSubscription()}>Upgrade to {tierState.tierData.upgradeTo}</button>
              )}
            </React.Fragment>
          )
        })}
      </>
    )
  }

  return (
    <Layout>
      <h1>Index Page</h1>
      <p>This is the index.tsx page, i.e. the root page that would render if visiting the site.</p>
      <Link to="/page-two/">Go to a different page</Link>
      <p>{data.site.siteMetadata.description}</p>
      {getRestOfPageContent()}
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
  }
`
export default Index
