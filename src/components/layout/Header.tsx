import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { useSelector } from 'react-redux'
import { navigateToManageStripeSubscription } from '../../helpers/NetlifyServerlessFunctionHelpers'
import { AppState } from '../../store/types'
import { init, login, logout } from '../../helpers/NetlifyIdentityHelpers'
import { Loader } from '../loader/Loader'
import { setIsRedirectingToManage } from '../../store/netlify/actions'

export interface IHeaderProps {
  siteTitle: string
}

export default function Header(props: IHeaderProps) {
  const { siteTitle } = props
  const { user, isInitFinished, isRedirectingToManage } = useSelector((state: AppState) => state.netlify)

  useEffect(() => {
    if (!isInitFinished) {
      init()
    }
  }, [isInitFinished])

  const getHeaderContent = () => {
    if (!isInitFinished) {
      return <Loader />
    }

    if (user) {
      const { user_metadata, app_metadata } = user
      const { full_name, avatar_url } = user_metadata
      const { roles } = app_metadata
      return (
        <>
          <p>
            You are logged in as <b>{full_name}</b>
          </p>
          <p>
            Your current subscription plan is: <b>{roles.join(' ')}</b>
          </p>
          {avatar_url && <img src={avatar_url} />}
          <button onClick={logout}>Log out</button>
          <button
            disabled={isRedirectingToManage}
            onClick={() => {
              setIsRedirectingToManage(true)
              navigateToManageStripeSubscription()
            }}
          >
            Manage Subscription
          </button>
        </>
      )
    } else {
      return <button onClick={login}>Log In</button>
    }
  }

  return (
    <header>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <p>This is the header.</p>
      {getHeaderContent()}
      <hr />
    </header>
  )
}
