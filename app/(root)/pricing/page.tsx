import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Check } from "lucide-react";

export const metadata = {
  title: "Preços",
};

export default function PricingPage() {
  return (
    <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24 mb-6">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Preços simples e transparentes
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Desbloqueie todos os recursos, incluindo inteligência artificial
          ilimitada!
        </p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            O que tem incluído no plano PRO:
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Crie histórias infinitas
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Colaboração ilimitada
            </li>

            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Ajuda de inteligência
              artificial ilimitada
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-5xl font-bold">R$ 7,90</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Cobrado mensalmente
            </p>
          </div>
          <div className={cn(buttonVariants({ size: "lg" }))}>
            <div className="flex flex-col">
              <p> Comece agora!</p>
              <p>*Em desenvolvimento</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
