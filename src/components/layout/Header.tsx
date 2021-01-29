import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { useSelector } from 'react-redux'
import { navigateToManageStripeSubscription } from '../../helpers/NetlifyServerlessFunctionHelpers'
import { AppState } from '../../store/types'
import { login, logout } from '../../helpers/NetlifyIdentityHelpers'
import netlifyIdentity from 'netlify-identity-widget'
import { Loader } from '../loader/Loader'

export interface IHeaderProps {
  siteTitle: string
}

export default function Header(props: IHeaderProps) {
  const { siteTitle } = props

  const netlify = useSelector((state: AppState) => state.netlify)

  const { user, isInitFinished } = netlify

  useEffect(() => {
    if (!isInitFinished) {
      netlifyIdentity.init()
    }
  })

  const getHeaderContent = () => {
    if (!isInitFinished) {
      return <Loader />
    }

    if (user) {
      const { user_metadata, token } = user
      const { full_name, avatar_url } = user_metadata
      if (token) {
        const { access_token } = token
        console.log(avatar_url)
        return (
          <>
            <p>You are logged in as {full_name}</p>
            {avatar_url && <img src={avatar_url} />}
            <button onClick={logout}>Log out</button>
            <button onClick={() => navigateToManageStripeSubscription(access_token)}>Manage Subscription</button>
          </>
        )
      }
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
