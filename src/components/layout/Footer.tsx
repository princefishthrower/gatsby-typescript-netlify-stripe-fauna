import * as React from 'react'

export interface IFooterProps {}

export function Footer() {
  return (
    <footer>
      <hr />
      <p>This is the footer.</p>© {new Date().getFullYear()} <a href="https://fullstackcraft.com">Full Stack Craft</a>&nbsp;🚀
    </footer>
  )
}
