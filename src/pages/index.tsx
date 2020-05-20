import * as React from 'react'
import { Link } from 'gatsby'
import IndexLayout from '../layouts'

const IndexPage = () => (
  <IndexLayout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-two/">Go to page two</Link>
  </IndexLayout>
)

export default IndexPage
