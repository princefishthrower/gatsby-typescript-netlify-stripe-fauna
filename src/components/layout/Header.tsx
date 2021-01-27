import { Link } from 'gatsby'
import React, { useState } from 'react'
import IdentityModal, { useNetlifyIdentity } from 'react-netlify-identity-widget'
import Constants from '../../constants/Constants'
import { manageSubscription } from '../../utils/manageSubscription'

export interface IHeaderProps {
  siteTitle: string
}

export default function Header(props: IHeaderProps) {
  const identity = useNetlifyIdentity(Constants.NETLIFY_URL)
  console.log(identity)
  const { siteTitle } = props
  const [showDialog, setShowDialog] = useState(false)
  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`
            }}
          >
            {siteTitle}
          </Link>
        </h1>

        {identity && identity.user ? (
          <>
            <p>You are logged in as {identity.user.user_metadata.full_name}</p>
            <button onClick={() => identity.logoutUser()}>Log out</button>
            <button onClick={() => manageSubscription(identity.user)}>Manage Subscription</button>
          </>
        ) : (
          <button onClick={() => setShowDialog(true)}>Log In</button>
        )}
      </div>
      <IdentityModal aria-label="Login Modal" showDialog={showDialog} onCloseDialog={() => setShowDialog(false)} />
    </header>
  )
}
