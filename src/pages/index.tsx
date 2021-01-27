import * as React from 'react'
import { Link } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity'
import IndexLayout from '../layouts'
import { login, signUp } from '../utils/identity'

const IndexPage = () => {
  const { loginUser, signupUser } = useIdentityContext()
  const formRef = React.useRef<any>(null)
  const [msg, setMsg] = React.useState('')

  const signup = () => {
    const email = formRef.current.email.value
    const password = formRef.current.password.value

    signupUser(email, password)
      .then(user => {
        console.log('Success! Signed up', user)
        navigate('/dashboard')
      })
      .catch(err => console.error(err) || setMsg(`Error: ${err.message}`))
  }

  return (
    <form
      ref={formRef}
      onSubmit={e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        load(loginUser(email, password, true))
          .then(user => {
            console.log('Success! Logged in', user)
            navigate('/dashboard')
          })
          .catch(err => console.error(err) || setMsg(`Error: ${err.message}`))
      }}
    >
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" name="email" />
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" name="password" />
      <input type="submit" value="Log in" />
      <button type="button" onClick={signup}>
        Sign Up{' '}
      </button>
      {msg && <pre>{msg}</pre>}
    </form>
  )
}

export default IndexPage
