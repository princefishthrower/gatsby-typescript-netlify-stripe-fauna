import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout/Layout'

const PageTwo = () => (
  <Layout>
    <h1>Here is page two</h1>
    <p>Yay!</p>
    <Link to="/a-markdown-page/">Go to markdown page</Link>
  </Layout>
)

export default PageTwo
