import { headers } from "next/headers";
import Stripe from "stripe";
import { db } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

interface Session {
  user: {
    id: string;
  };
}

export async function POST(req: Request) {
  const body = await req.text();
  const userSession = await auth() as Session;
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeWebhookSecret) {
    console.log("Sem")
    return new Response("Webhook Error: Stripe webhook secret is undefined", {
      status: 400,
    });
  }
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    );
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log(session?.metadata?.userId);
  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await db.user.update({
      where: {
        id: session?.metadata?.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the price id and set the new period end.
    await db.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }
  return new Response(null, { status: 200 });
}
