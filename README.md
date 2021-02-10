# gatsby-typescript-netlify-stripe-fauna

A full, multi-page static boilerplate using Gatsby, React with TypeScript, and Redux, including authentication with Netlify's identity platform, subscriptions with Stripe, and customer data handling with Fauna.

This example site is live at [https://gatsby-typescript-netlify-stripe-fauna.netlify.app/](https://gatsby-typescript-netlify-stripe-fauna.netlify.app/)

# What You Need to Do to Get Your Own Copy of this Boilerplate to Work

This boilerplate WON'T work with just a `npm install` and `npm run start`!

You NEED to do the following first:

1. Create or login to your Fauna DB account and copy over the schema in this repository from `db/schema.gql`
2. Create a total of 5 products in your stripe account (make sure 'Viewing test data' is ACTIVE, for starters!!!)
   - I. Free Subscription, \$0.00
   - II. Pro Subscription Monthly, \$10.00 / month
   - III. Pro Subscription Annual, \$100.00 / year (2 months free!)
   - IV. Premium Subscription Monthly, \$40.00 / month
   - V. Premium Subscription Annual, \$400.00 / year (2 months free!)
3. Also create a webhook in stripe for the url with pattern https://<<YOUR UNIQUE NETLIFY APP NAME HERE>>.netlify.app/.netlify/functions/handle-subscription-change and the event `customer.subscription.updated`
4. Fill out the following environment variables in your Netlify deploy environment variables:
   - FAUNA_SERVER_KEY - Your secret key to your Fauna DB instance from step 1.
   - STRIPE_FREE_PRICE_ID - The price ID of the free plan you created in step 2 (looks something like `price_blahblahblah` - note this is NOT the "product ID", but the "price ID")
   - STRIPE_SECRET_KEY - Your secret API key from stripe (looks something like `sk_test_blahblahblah`) - again, make sure 'Viewing test data' is ACTIVE).
   - STRIPE_PUBLISHABLE_KEY - Your public API key from stripe (looks something like `pk_test_blahblahblah`) - again, make sure 'Viewing test data' is ACTIVE).
   - STRIPE_WEBHOOK_SECRET - The webhook signing secret from the webhook you created in step 3. (Again, make sure 'Viewing test data' is ACTIVE)
   - SLACK_WEBHOOK_URL - if you want to get serverless functions with error logging to a Slack bot, provide this key as well

# What's Inside?

- Gatsby for super speedy static page generating 🚀
- TypeScript for type safety :smile:
- Netlify Identity Widget ([netlify-identity-widget](https://github.com/netlify/netlify-identity-widget)) for authentication
- Redux for state management of Netlify User (logging in and logging in events) (see `gatsby-browser.js` and `gatsby-ssr.js` to see how to add a Redux store to a static site :smile:)
- React Toastify ([react-toastify](https://github.com/fkhadra/react-toastify)) for fancy popups and notifications for the user
- Fauna DB for relating Stripe and Netlify users
- Stripe for payment plan management

# Other Notes

This boilerplate has absolutely no styling! That's the point. It's a boilerplate. :joy:

Enjoy styling it anyway you want!

# Credit Where Credit is Due

This blog is a heavily refactored version of the ["Subscription Management in Jamstack Apps" tutorial](https://github.com/stripe-samples/netlify-stripe-subscriptions) from Netlify itself. All credit to Jason Lengstorf and Thor 雷神.
