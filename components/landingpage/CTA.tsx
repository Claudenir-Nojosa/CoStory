import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <h2 className="text-3xl font-bold  sm:text-4xl md:text-5xl">
        Comece a criação de incríveis histórias colaborativas
      </h2>
      <p className="mt-4 max-w-2xl text-lg sm:text-xl md;text-2xl text-muted-foreground">
        Junte-se a nossa comunidade e liberte sua criatividade criando e contribuindo com histórias cativantes. Comece agora!
      </p>
      <Link
        className={`bg-gradient-to-r from-secondary-foreground to-muted-foreground ${buttonVariants(
          {
            size: "lg",
            className: "mt-5",
          }
        )}`}
        href="/login"
      >
        Criar conta <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
};

export default CTA;
