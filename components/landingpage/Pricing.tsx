"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const Pricing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.2 }}
      className="mb-40 mt-10"
    >
      <div className="flex flex-col gap-2 text-center justify-center items-center mb-20">
        <h2 className="text-center mb-6 font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl ">
          Preço
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Comece a aprimorar histórias de uma maneira muito mais prática com a
          ajuda ilimitada de inteligência artificial.
        </p>
      </div>
      <div className="flex justify-center gap-3 mx-6 space-y-6 sm:space-x-8 sm:flex-row flex-col sm:space-y-0">
        <Card className="text-start">
          <CardHeader>
            <CardDescription className="text-xl">Gratuito</CardDescription>
            <CardTitle className="text-4xl">R$ 0</CardTitle>
            <CardDescription className="text-muted-foreground">
              Crie histórias da maneira padrão.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="flex gap-x-2 mb-4">
              <Check />
              <p className="mb-2 text-start text-muted-foreground">
                Crie histórias infinitas
              </p>
            </div>
            <div className="flex gap-x-2 mb-4">
              <X />
              <p className="mb-2 text-start text-muted-foreground">
                Colaboração ilimitada
              </p>
            </div>
            <div className="flex gap-x-2 mb-4">
              <X />
              <p className="mb-2 text-start text-muted-foreground">
                Ajuda de inteligência artificial ilimitada
              </p>
            </div>
            <Link href="/login">
              <Button variant={"outline"}>Comece agora</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="text-start">
          <CardHeader>
            <CardDescription className="text-xl">Pro</CardDescription>
            <CardTitle className="text-4xl dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text dark:text-transparent">
              R$ 12,90
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Tenha mais poder criativo.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="flex gap-x-2 mb-4">
              <Check />
              <p className="mb-2 text-start text-muted-foreground">
                Crie histórias infinitas
              </p>
            </div>
            <div className="flex gap-x-2 mb-4">
              <Check />
              <p className="mb-2 text-start text-muted-foreground">
                Colaboração ilimitada
              </p>
            </div>
            <div className="flex gap-x-2 mb-4">
              <Check />
              <p className="mb-2 text-start text-muted-foreground">
                Ajuda de inteligência artificial ilimitada
              </p>
            </div>
            <Link href="/">
              <Button
                variant={"outline"}
                className="dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800 bg-clip-text dark:text-transparent"
              >
                Se torne PRO
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Pricing;
