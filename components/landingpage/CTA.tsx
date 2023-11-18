import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const CTA = () => {
  return (
    <div className="flex flex-col items-center bg-white px-6 py-16 text-center">
      <h2 className="text-3xl font-bold text-purple-500 sm:text-4xl md:text-5xl">
        asdkskd
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-gray-700 sm:text-xl md;text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        explicabo error ea animi sint voluptatum vero libero rem repellendus!
        Enim natus asperiores molestiae assumenda animi similique ullam unde cum
        consectetur.
      </p>
      <Link href="/">
        <Button className="text-sm sm:text-lg px-4 py-5 mt-4">Create</Button>
      </Link>
    </div>
  );
};

export default CTA;
