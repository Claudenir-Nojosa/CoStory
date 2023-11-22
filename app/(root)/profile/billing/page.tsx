import { ManageUserSubscriptionButton } from "@/components/billing/ManageUserSubscription";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { storeSubscriptionPlans } from "@/config/subscription";
import { auth } from "@/lib/auth";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { signIn } from "next-auth/react";

export default async function Billing() {
  const session = await auth();
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <div className="min-h-[calc(100vh-57px)] py-8 px-4 md:px-16 lg:px-24">
      <Card className="p-6 mb-2">
        <p className="text-lg font-semibold leading-none">
          {subscriptionPlan.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {!subscriptionPlan.isSubscribed
            ? "You are not subscribed to any plan."
            : subscriptionPlan.isCanceled
            ? "Your plan will be canceled on "
            : "Your plan renews on "}
          {subscriptionPlan?.stripeCurrentPeriodEnd
            ? subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString()
            : null}
        </p>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {storeSubscriptionPlans.map((plan: any) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-end">
              {session?.user ? (
                <ManageUserSubscriptionButton
                  userId={session.user.id as string}
                  email={session.user.email as string}
                  stripePriceId={plan.stripePriceId}
                  stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                  isSubscribed={!!subscriptionPlan.isSubscribed}
                  isCurrentPlan={subscriptionPlan?.name === plan.name}
                />
              ) : (
                <Button onClick={() => signIn()}>ss</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
