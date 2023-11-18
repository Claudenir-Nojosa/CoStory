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

const Pricing = () => {
  return (
    <div className="mb-40 mt-10">
      <h2 className="text-5xl text-white font-bold text-center mb-8">Preço</h2>
      <div className="flex justify-center mx-6 space-y-6 sm:space-x-8 sm;flex-row sm:space-y-0">
        <Card className="text-center">
          <CardHeader>
            <CardDescription className="text-xl">Gratuito</CardDescription>
            <CardTitle className="text-4xl">ASDSALM</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="mb-2 text-center text-gray-600">Create</p>
            <Link href="/">
              <Button variant={"outline"}>Tasd</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardDescription className="text-xl">PRO</CardDescription>
            <CardTitle className="text-4xl">ASDSALM</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="mb-2 text-center text-gray-600">Create</p>
            <Link href="/">
              <Button variant={"outline"}>Tasd</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
