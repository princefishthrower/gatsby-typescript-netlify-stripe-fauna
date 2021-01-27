import netlifyIdentity, { User } from 'netlify-identity-widget'

const tiers = ['free', 'pro', 'premium']
export const login = () => {
  console.log('hello noobs')
  netlifyIdentity.open('login')
}
export const signUp = () => netlifyIdentity.open('signup')
export const logout = () => netlifyIdentity.logout()
export const createManageLink = async (user: User) => {
  if (user.token) {
    const response = await fetch('/.netlify/functions/create-manage-link', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token.access_token}`
      }
    })
    const data = response.json() as any
    window.location.href = data.link
  } else {
    // TODO: toast error!
  }
}

export const getSubscriptionContent = (user: User) => {
  tiers.forEach(async type => {
    if (user.token) {
      const response = await fetch('/.netlify/functions/get-protected-content', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token.access_token}`
        },
        body: JSON.stringify({ type })
      })

      const data = await response.json()
      return data
    }
    // TODO: error toast!
    return {}
  })
}

// const updateUserInfo = user => {
//   const container = document.querySelector('.user-info')

//   // cloning the buttons removes existing event listeners
//   // const b1 = button1.cloneNode(true);
//   // const b2 = button2.cloneNode(true);

//   // empty the user info div
//   container.innerHTML = ''

//   if (user) {
//     b1.innerText = 'Log Out'
//     b1.addEventListener('click', () => {
//       netlifyIdentity.logout()
//     })

//     b2.innerText = 'Manage Subscription'
//     b2.addEventListener('click', () => {
//       // TODO handle subscription management
//       fetch('/.netlify/functions/create-manage-link', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${user.token.access_token}`
//         }
//       })
//         .then(res => res.json())
//         .then(link => {
//           window.location.href = link
//         })
//         .catch(err => console.error(err))
//     })
//   } else {
//     // if no one is logged in, show login/signup options
//     b1.innerText = 'Log In'
//     b1.addEventListener('click', login)

//     b2.innerText = 'Sign Up'
//     b2.addEventListener('click', signup)
//   }

//   // add the updated buttons back to the user info div
//   container.appendChild(b1)
//   container.appendChild(b2)
// }

// const loadSubscriptionContent = async (user: User) => {
//   const currentUser = netlifyIdentity.currentUser()
//   if (currentUser) {
//     const token = user ? await currentUser.jwt(true) : false
//     ;['free', 'pro', 'premium'].forEach(type => {
//       fetch('/.netlify/functions/get-protected-content', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ type })
//       })
//         .then(res => res.json())
//         .then(data => {
//           const template = document.querySelector('#content')
//           const container = document.querySelector(`.${type}`)

//           // remove any existing content from the content containers
//           const oldContent = container.querySelector('.content-display')
//           if (oldContent) {
//             container.removeChild(oldContent)
//           }

//           const content = template.content.cloneNode(true)

//           const img = content.querySelector('img')
//           img.src = data.src
//           img.alt = data.alt

//           const credit = content.querySelector('.credit')
//           credit.href = data.creditLink
//           credit.innerText = `Credit: ${data.credit}`

//           const caption = content.querySelector('figcaption')
//           caption.innerText = data.message
//           caption.appendChild(credit)

//           container.appendChild(content)
//         })
//     })
//   }
// }

// const handleUserStateChange = (user: User) => {
//   updateUserInfo(user)
//   getSubscriptionContent(user)
// }

// netlifyIdentity.on('init', handleUserStateChange)
// netlifyIdentity.on('login', handleUserStateChange)
// netlifyIdentity.on('logout', handleUserStateChange)

netlifyIdentity.on('login', user => getSubscriptionContent(user))
