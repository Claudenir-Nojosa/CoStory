import { SubscriptionPlan } from "@/types";

export const freePlan: SubscriptionPlan = {
  name: "Gratuito",
  description:
    "O plano gratuito é limitado a 3 intervenções de IA. Atualize para o plano PRO para ajuda ilimitada.",
  stripePriceId: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "O plano PRO tem inteligência artificial ilimitado.",
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
};
