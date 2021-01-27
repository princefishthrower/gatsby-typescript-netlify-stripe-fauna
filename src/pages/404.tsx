import * as React from 'react'
import { Link } from 'gatsby'
import IndexLayout from '../layouts'

const FourZeroFour = () => (
  <IndexLayout>
    <h1>Uh oh, thats 404!</h1>
    <Link to="/">Take me home!</Link>
  </IndexLayout>
)

export default FourZeroFour
