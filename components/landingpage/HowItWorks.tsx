import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="py-24">
      <h2 className="mb-5 text-center text-5xl font-bold">tadasd</h2>
      <div className="mx-auto flex flex-col md:max-w-7xl md:space-y-12">
        <div className="flex flex-col justify-between sm:flex-row sm:space-y-0">
          <div className="mx-auto w-full p-6 md:w-1/2">
            <Image src="/" alt="" width={30} height={30} />
          </div>
          <div className="flex w-full flex-col items-start justify-center px-8 py-6 text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-purple-500">adasd</h3>
            <p className="mt-2 font-semibold text-gray-600">dfkdsmfksdf</p>
            <ul className="mt-2">
              <li className="text-gray-400 flex items-center font-light">
                check
              </li>
              <li className="text-gray-400 flex items-center font-light">
                check
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
