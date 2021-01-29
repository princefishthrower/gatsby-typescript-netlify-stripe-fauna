import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout/Layout'

const PageTwo = () => (
  <Layout>
    <h1>Page two</h1>
    <p>
      This page is just a pure rendered component. No Netlify Identify functions or serverless functions are run or called in this
      component.
    </p>
    <Link to="/a-markdown-page/">Ok, take me to a markdown page!</Link>
  </Layout>
)

export default PageTwo
