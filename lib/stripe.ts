import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_API_KEY;

if (!stripeApiKey) {
  throw new Error("STRIPE_API_KEY is not defined");
}

export const stripe = new Stripe(stripeApiKey, {
  apiVersion: "2023-10-16",
  typescript: true,
});
