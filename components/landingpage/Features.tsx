import React from "react";
import { buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Features = () => {
  return (
    <div className="mx-auto mb-5 max-w-5xl mt-40 sm:mt-56">
      <div className="mb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2
            className="text-2xl font-bold sm:text-4xl md:text-6xl"
          >
            Plataforma colaborativa de criação de histórias.{" "}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experimente o poder da edição em tempo real, da colaboração da
            comunidade e da ramificação da história.
          </p>
        </div>
      </div>

      {/* steps */}
      <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
        <li className="md:flex-1">
          <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
            <span>Edição em tempo real</span>
            <span className="text-xl font-semibold">
              Colabore perfeitamente com outras pessoas em tempo real,
              facilitando a criação de histórias.
            </span>
          </div>
        </li>
        <li className="md:flex-1">
          <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
            <span>Votação das alterações da história</span>
            <span className="text-xl font-semibold">
              Interaja com a comunidade e a permita moldar a sua história
              através da sua permissão.
            </span>
          </div>
        </li>
      </ol>
      <Link
        className={`bg-gradient-to-r from-secondary-foreground to-muted-foreground ${buttonVariants(
          {
            size: "lg",
            className: "mt-5",
          }
        )}`}
        href="/login"
      >
        Comece agora <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
};

export default Features;
