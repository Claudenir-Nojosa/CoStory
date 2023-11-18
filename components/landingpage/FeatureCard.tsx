import React, { FC } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-purple-200 bg-white p-8 text-center">
      <div className="mb-4 rounded-full bg-purple-500 p-4 text-white">
        {icon}
      </div>
      <h2 className="mt-4 text-xl font-light text-purple-500">{title}</h2>
      <p className="mt-2 italic text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
