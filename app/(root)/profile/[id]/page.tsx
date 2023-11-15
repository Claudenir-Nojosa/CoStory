"use client";

import UserEdit from "@/components/forms/editUser";
import React, { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  return (
    <div>
      <UserEdit params={params} />
    </div>
  );
};

export default page;
