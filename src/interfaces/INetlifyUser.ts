// See https://github.com/netlify/netlify-identity-widget/issues/358
// Currently, while the jwt can be updated with Netlify Identity, there is no way to update the user object itself
// So, we build a custom user for our own purposes for this app which we use with redux
export default interface INetlifyUser {
  token: string
  user_metadata: {
    avatar_url: string
    full_name: string
  }
  app_metadata: {
    roles: Array<string>
  }
}
