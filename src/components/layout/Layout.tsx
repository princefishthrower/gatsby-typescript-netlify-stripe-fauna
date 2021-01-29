/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import 'react-toastify/dist/ReactToastify.css'
import '../../styles/styles.scss'
import { ToastContainer } from 'react-toastify'
import Header from './Header'
import { Footer } from './Footer'

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </>
      )}
    />
  )
}

export default Layout
