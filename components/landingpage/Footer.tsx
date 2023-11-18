import React from "react";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div className=" px-10 py-4 text-right text-muted-foreground">
      <Separator className="mb-10"/>
      © 2023 coStory. Todos os direitos reservados
    </div>
  );
};

export default Footer;
