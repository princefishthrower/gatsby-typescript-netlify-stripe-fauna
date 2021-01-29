module.exports = {
  siteMetadata: {
    title: 'gatsby-typescript-netlify-stripe-fauna-boilerplate',
    description:
      "A full, multi-page static boilerplate using Gatsby and TypeScript, including authentication with Netlify's identity platform, subscriptions with Stripe, and customer data handling with Fauna.",
    keywords: 'gatsbyjs, gatsby, typescript',
    siteUrl: 'https://github.com/princefishthrower/gatsby-simple-typescript-boilerplate',
    author: {
      name: 'Chris Frewin',
      url: 'https://chrisfrew.in',
      email: 'frewin.christopher@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://github.com/princefishthrower/gatsby-simple-typescript-boilerplate'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass'
  ]
}
