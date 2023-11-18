"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import TypewriterComponent from "typewriter-effect";

const Hero = () => {
  return (
    <div className="mx-4 mb-14 mt-6 flex flex-1 flex-col items-center text-center sm:mb-12 md:mb-32 md:mt-20">
      <h1 className="max-w-5xl text-2xl font-bold sm:text-4xl md:text-6xl">
        Convert content
        <span className="bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text ">
          <TypewriterComponent
            options={{
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Histórias colaborativas")
                .pauseFor(1000)
                .deleteAll()
                .typeString("🤖 teste")
                .pauseFor(2000)
                .start();
            }}
          />
        </span>
      </h1>
      <p className="sm:text-md mt-5 max-w-2xl text-sm text-gray-600 md:text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
        accusantium officia recusandae ut ipsum minus minima nihil quisquam
        voluptatem tempore placeat doloremque, similique amet molestiae labore?
        Consequuntur non quas amet.
      </p>
      <div className="mt-3 flex max-w-4xl flex-col flex-wrap items-center justify-around sm:w-full sm:flex-row">
        <Link href="/">
          <Button className="md:text-xl">Button</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
