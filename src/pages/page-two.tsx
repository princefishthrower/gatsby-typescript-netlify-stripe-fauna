import * as React from 'react'
import { Link } from 'gatsby'
import IndexLayout from '../layouts'

const PageTwo = () => (
  <IndexLayout>
    <h1>Here is page two</h1>
    <p>Yay!</p>
    <Link to="/a-markdown-page/">Go to markdown page</Link>
  </IndexLayout>
)

export default PageTwo
