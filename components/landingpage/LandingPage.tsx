import React from "react";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import CTA from "./CTA";
import Footer from "./Footer";
import Features from "./Features";
import { Separator } from "../ui/separator";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
    </div>
  );
};

export default LandingPage;
