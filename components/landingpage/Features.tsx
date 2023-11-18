import React from "react";
import { buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Features = () => {
  return (
    <section className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl ">
          Plataforma colaborativa de criação de histórias.
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Experimente o poder da edição em tempo real, da colaboração da
          comunidade e da ramificação da história.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6 ">
            <Image
              src="/assets/hour.svg"
              alt="Edição em tempo real"
              width={44}
              height={44}
            />
            <div className="space-y-2">
              <h3 className="font-bold bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent">
                Edição em tempo real
              </h3>
              <p className="text-sm">
                Colabore com outras pessoas em tempo real.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Image
              src="/assets/collaboration.svg"
              alt="Colaboração Dinâmica"
              width={44}
              height={44}
            />
            <div className="space-y-2">
              <h3 className="font-bold bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent">
                Colaboração Dinâmica
              </h3>
              <p className="text-sm">
                Enriqueça suas histórias com a colaboração dinâmica da
                comunidade.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Image
              src="/assets/favorites.svg"
              alt="Favoritos"
              width={44}
              height={44}
            />
            <div className="space-y-2">
              <h3 className="font-bold bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent">
                Favoritos
              </h3>
              <p className="text-sm">
                Explore histórias e separe as suas favoritas.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Image src="/assets/robot.svg" alt="IA" width={44} height={44} />
            <div className="space-y-2">
              <h3 className="font-bold bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent">
                Inteligência Artificial
              </h3>
              <p className="text-sm">
                Utilize-se de IA para incrementar na narrativa.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Image
              src="/assets/creativity.svg"
              alt="Criatividade"
              width={44}
              height={44}
            />
            <div className="space-y-2">
              <h3 className="font-bold bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent">
                Ambiente Cativante
              </h3>
              <p className="text-sm">
                Immerja-se em um ambiente cativante que estimula a criatividade.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Image
              src="/assets/premium.svg"
              alt="Premium"
              width={44}
              height={44}
            />
            <div className="space-y-2">
              <h3 className="font-bold bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent">
                Experiência de Assinatura
              </h3>
              <p className="text-sm">
                Explore recursos premium e apoie a plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
