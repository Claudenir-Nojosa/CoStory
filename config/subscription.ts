export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  stripePriceId: string;
  price: number;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "pro",
    name: "PRO",
    description:
      "Teste",
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
    price: 7.90,
  },
];