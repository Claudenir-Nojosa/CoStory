import React from "react";
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Hr } from "@react-email/hr";

export default function ForgotPasswordEmail({
  params,
}: {
  params: { name: string; url: string };
}) {
  return (
    <Html>
      <Heading as="h2"> Olá {params.name} </Heading>
      <Text>
        Nós recebemos seu pedido de alteração de senha. Caso não tenha feito isso, por gentileza, ignore o e-mail.
      </Text>
      <Button
        href={params.url}
        style={{ background: "#000", color: "#FFFFFF", padding: 4 }}
      >
        Clique aqui
      </Button>
      <Hr />

      <Heading as="h3">Atenciosamente</Heading>
      <Text>co Story</Text>
    </Html>
  );
}