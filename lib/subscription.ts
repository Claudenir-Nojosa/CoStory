import { storeSubscriptionPlans } from "@/config/subscription";
import { db } from "./prismadb";
import { stripe } from "./stripe";
import { auth } from "./auth";

interface Session {
  user: {
    id: string;
  };
}

export async function getUserSubscriptionPlan() {
  const session = await auth() as Session

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const isSubscribed =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();

  const plan = isSubscribed
    ? storeSubscriptionPlans.find(
      (plan:any) => plan.stripePriceId === user.stripePriceId,
    )
    : null;

  let isCanceled = false;
  if (isSubscribed && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
    stripeCustomerId: user.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}