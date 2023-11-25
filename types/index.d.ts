export type FormStoryInput = {
  title: string;
  content: string;
  coverImage: string;
  category: string;
  isCompleted: boolean;
};

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}
export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }
