"use client";

import React from "react";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const isForgotPassword = pathname.includes("forgot-password");

  return (
    <div
      className={`${
        isForgotPassword
          ? "px-10 py-4 text-right text-muted-foreground absolute bottom-0 right-0 w-full"
          : "px-10 py-4 text-right text-muted-foreground"
      } `}
    >
      <Separator className="mb-10" />© 2023 coStory. Todos os direitos
      reservados
    </div>
  );
};

export default Footer;
