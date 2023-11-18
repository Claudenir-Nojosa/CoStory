import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        Comece a criação de <br /> incríveis histórias colaborativas
      </h2>
      <p className="mt-4 max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        Junte-se a nossa comunidade e liberte sua criatividade criando e
        contribuindo com histórias cativantes. Comece agora!
      </p>
      <Link href="/">
        <Button
          variant={"ghost"}
          className="mt-10 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text dark:text-transparent text-xl"
        >
          Criar conta!
        </Button>
      </Link>
    </div>
  );
};

export default CTA;
