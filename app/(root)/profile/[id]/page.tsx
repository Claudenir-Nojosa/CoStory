"use client";

import UserEdit from "@/components/forms/editUser";
import React, { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  return <UserEdit params={params} />;
};

export default page;
