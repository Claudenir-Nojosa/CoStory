"use client";

import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import TypewriterComponent from "typewriter-effect";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="mx-4 mb-14 mt-6 flex flex-1 flex-col items-center text-center sm:mb-12 md:mb-32 md:mt-20">
      <span className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text text-transparent font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
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
      <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        com coStory
      </h2>
      <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mt-10">
        Participe da criação de histórias cativantes com outras pessoas em uma
        plataforma colaborativa e inspiradora.
      </p>
      <div className="mt-10 flex max-w-4xl flex-col flex-wrap items-center justify-center gap-6 sm:w-full sm:flex-row">
        <Link href="/">
          <Button variant={"outline"}>
            Saiba mais <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Link href="/">
          <Button>
            Comece agora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      <div>
        <div className="isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 opacity-25 sm:left-[calc(46%-30rem)] sm:w-[102.1875rem]"
            />
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 200, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 200, scale: 0.5 }}
        transition={{duration: 0.5}}
        className="mt-20 origin-center"
      >
        <Image
          src="/assets/contribuições.png"
          alt="coStory história"
          width={900}
          height={900}
          className="rounded-xl"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
