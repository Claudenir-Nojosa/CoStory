"use client";

import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import TypewriterComponent from "typewriter-effect";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="mx-4 mb-14 mt-6 flex flex-1 flex-col items-center text-center sm:mb-12 md:mb-32 md:mt-20">
      <span className="bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text max-w-5xl text-2xl font-bold sm:text-4xl md:text-6xl">
        <TypewriterComponent
          options={{
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("Libere sua criatividade")
              .pauseFor(1000)
              .deleteAll()
              .typeString("Crie incríveis histórias")
              .pauseFor(2000)
              .start();
          }}
        />
      </span>
      <h1 className="max-w-5xl text-2xl font-bold sm:text-4xl md:text-6xl">
        com coStory
      </h1>
      <p className="sm:text-md mt-5 max-w-2xl text-sm text-muted-foreground md:text-xl">
        Participe da criação de histórias cativantes com outras pessoas em uma
        plataforma colaborativa e inspiradora.
      </p>
      <div className="mt-3 flex max-w-4xl flex-col flex-wrap items-center justify-center gap-3 sm:w-full sm:flex-row">
      <Link
        className={`bg-gradient-to-r from-secondary-foreground to-muted-foreground ${buttonVariants(
          {
            size: "lg",
            className: "mt-5",
          }
        )}`}
        href="/login"
      >
        Saiba mais <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
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
    </div>
  );
};

export default Hero;
