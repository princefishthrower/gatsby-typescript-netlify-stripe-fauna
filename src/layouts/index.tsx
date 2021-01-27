import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import 'modern-normalize'
import { IdentityContextProvider } from 'react-netlify-identity'
import LayoutRoot from '../components/LayoutRoot'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const IndexLayout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <IdentityContextProvider url="https://gatsby-typescript-netlify-stripe-fauna.netlify.com">
        <LayoutRoot>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: data.site.siteMetadata.description },
              { name: 'keywords', content: data.site.siteMetadata.keywords }
            ]}
          />
          {children}
        </LayoutRoot>
      </IdentityContextProvider>
    )}
  />
)

export default IndexLayout
