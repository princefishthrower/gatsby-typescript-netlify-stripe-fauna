import * as React from 'react'

export interface IFooterProps {}

export function Footer() {
  return (
    <footer>
      © {new Date().getFullYear()} <a href="https://www.gatsbyjs.org">Full Stack Craft</a>&nbsp;🚀
    </footer>
  )
}
