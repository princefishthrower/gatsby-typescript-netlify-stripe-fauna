import { Link } from 'gatsby'
import React, { useState } from 'react'
import IdentityModal from 'react-netlify-identity-widget'

export interface IHeaderProps {
  siteTitle: string
}

export default function Header(props: IHeaderProps) {
  const { siteTitle } = props
  const [showDialog, setShowDialog] = useState(false)
  console.log('I AM RENDERING AAAAA')
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
        <button onClick={() => setShowDialog(true)}>Log In</button>
      </div>
      <IdentityModal aria-label="Login Modal" showDialog={showDialog} onCloseDialog={() => setShowDialog(false)} />
    </header>
  )
}
