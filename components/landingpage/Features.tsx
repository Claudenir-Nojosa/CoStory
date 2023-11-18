import React from "react";
import FeatureCard from "./FeatureCard";
import { Moon } from "lucide-react";

const Features = () => {
  return (
    <div className="relative z-10 flex flex-col justify-center space-y-10 px-8 pb-12 pt-8 sm:py-12 md:flex-row md:space-x-10 md:space-y-10 md:py-20 lg:py-28 2xl:py-32">
      <div className="absolute inset-0 z-0 -skew-y-6 transform bg-gradient-to-r from-purple-500 to-purple-50">
        <FeatureCard title="Teste" description="descrição " icon={<Moon />} />
        <FeatureCard title="Teste" description="descrição " icon={<Moon />} />
        <FeatureCard title="Teste" description="descrição " icon={<Moon />} />
      </div>
    </div>
  );
};

export default Features;
