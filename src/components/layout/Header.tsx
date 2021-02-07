import React from 'react'
import { Link } from 'gatsby'
import { useSelector } from 'react-redux'
import { navigateToManageStripeSubscription } from '../../helpers/NetlifyServerlessFunctionHelpers'
import { AppState } from '../../store/types'
import { login, logout, signUp } from '../../helpers/NetlifyIdentityHelpers'
import { useState } from 'react'
import { ManageSubscriptionButton } from '../ManageSubscriptionButton'

export interface IHeaderProps {
  siteTitle: string
}

export default function Header(props: IHeaderProps) {
  const { siteTitle } = props
  const { user } = useSelector((state: AppState) => state.netlify)

  const getHeaderContent = () => {
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
          <ManageSubscriptionButton label="Manage Subscription" />
        </>
      )
    }
    return (
      <>
        <button onClick={signUp}>Sign up</button>
        <button onClick={login}>Log in</button>
      </>
    )
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
