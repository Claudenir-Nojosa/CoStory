import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BillingForm } from "@/components/shared/billing-form"
import { DashboardHeader } from "@/components/shared/header"
import { DashboardShell } from "@/components/shared/shell"
import { FileWarningIcon } from "lucide-react"
import { auth } from "@/lib/auth"

interface Session {
  user: {
    id: string;
    email: string;
  };
}

export const metadata = {
  title: "Cobrança",
  description: "Gerencie o faturamento e seu plano de assinatura.",
}

export default async function BillingPage() {
  const user = await auth() as Session;

  if (!user) {
    redirect("/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.user.id)

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return (
    <DashboardShell className="px-6">
      <DashboardHeader
        heading="Mensalidade"
        text="Gerencie sua mensalidade e seu plano de assinatura."
      />
      <div className="grid gap-8">
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
      </div>
    </DashboardShell>
  )
}
