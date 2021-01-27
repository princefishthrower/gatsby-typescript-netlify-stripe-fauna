# gatsby-typescript-netlify-stripe-fauna

A full, multi-page static boilerplate using Gatsby and TypeScript, including authentication with Netlify's identity platform, subscriptions with Stripe, and customer data handling with Fauna.

## What You Need To Do For this Boilerplate to Work

This boilerplate WON'T work with just a `npm install` and `npm run start`!

You NEED to do the following first:

1. Create or login to your Fauna DB account and copy over the schema from `db/schema.gql`
2. Create a total of 5 products in your stripe account (make sure 'Viewing test data' is ACTIVE, for starters!!!)
   - I. Free Subscription, \$0.00
   - II. Pro Subscription Monthly, \$10.00 / month
   - III. Pro Subscription Yearly, \$100.00 / year (2 months free!)
   - IV. Premium Subscription Monthly, \$40.00 / month
   - V. Premium Subscription Yearly, \$400.00 / year (2 months free!)
3. Also create a webhook in stripe for the url with pattern https://<<YOUR UNIQUE NETLIFY APP NAME HERE>>.netlify.app/.netlify/functions/handle-subscription-change and the event `customer.subscription.updated`
4. Fill out the following environment variables in your Netlify deploy environment variables:
   - FAUNA_SERVER_KEY - Your secret key to your Fauna DB instance from step 1.
   - STRIPE_DEFAULT_PRICE_PLAN - The price ID to your free subscription from Stripe from step 2.
   - STRIPE_SECRET_KEY - Your secret API key from stripe (looks something like `sk_test_123120234232`) - again, make sure 'Viewing test data' is ACTIVE).
   - STRIPE_WEBHOOK_SECRET - The webhook signing secret from the webhook you created in step 3. (Again, make sure 'Viewing test data' is ACTIVE)

## Other Notes

This boilerplate has no styles. That's the point. It's a boilerplate. :joy: Enjoy styling it anyway you want!

This blog is a heavily refactored version of the ["Subscription Management in Jamstack Apps" tutorial](https://github.com/stripe-samples/netlify-stripe-subscriptions) from Netlify itself. All credit to Jason Lengstorf and Thor 雷神.
