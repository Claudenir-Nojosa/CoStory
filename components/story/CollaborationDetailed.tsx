"use client";

import { db } from "@/lib/prismadb";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteStory from "./DeleteStory";
import Contributions from "./Contributions";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Contributor } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface ContributionDetailPageProps {
  params: {
    id: string;
  };
}

const formatDate = (date: string | Date) => {
  const parsedDate =
    typeof date === "string"
      ? parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", new Date())
      : date;
  return format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
};

const ContributionDetailed: FC<ContributionDetailPageProps> = ({ params }) => {
  const { data: dataContribution, isLoading: isLoadingStory } = useQuery({
    queryKey: ["contribution", params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/story/contributions/${params.id}`);
      return response.data;
    },
  });
  console.log(dataContribution);

  const { mutate: acceptContribution } = useMutation<Contributor, unknown>({
    mutationFn: async () => {
      const patchBody = {
        isAccepted: true,
      };
      const response = await axios.patch(
        `/api/story/contributions/${dataContribution?.id}`,
        patchBody
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Contribuição aceita com sucesso!");
    },
    onError: (data) => {
      toast.error(
        "Aconteceu um erro ao aceitar a contribuição, tente novamente"
      );
    },
  });

  const { data: session, status } = useSession();
  return (
    <MaxWidthWrapper>
      {dataContribution && (
        <Card>
          <CardHeader>
            <div className="flex gap-2 flex-col items-center">
              <Avatar className="ml-4">
                {typeof dataContribution.user.image === "string" ? (
                  <AvatarImage src={dataContribution.user.image} />
                ) : (
                  ""
                )}
              </Avatar>
              <p className="text-2xl font-semibold">
                Contribuição de: {dataContribution.user.name}
              </p>
              <p className="text-muted-foreground font-semibold">
                Criado dia: {formatDate(dataContribution.createdAt)}
              </p>
              <div className="flex gap-2">
                <h3 className="text-muted-foreground ">Está aceita ?</h3>
                <Badge> {dataContribution.isAccepted ? "Sim" : "Não"}</Badge>
              </div>
              <Accordion
                className="justify-center flex"
                type="single"
                collapsible
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-semibold">
                    História original
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dataContribution.story.content,
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="mt-10 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Colaboração da história:</h2>
            <div
              dangerouslySetInnerHTML={{ __html: dataContribution.newContent }}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            {dataContribution.story.userId === session?.user.id ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size={"icon"}
                      variant={"link"}
                      onClick={() => acceptContribution()}
                    >
                      <Image
                        src="/assets/accept.svg"
                        alt="Aceitar contribuição"
                        width={30}
                        height={30}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Implementar para a história original</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              ""
            )}
          </CardFooter>
        </Card>
      )}
    </MaxWidthWrapper>
  );
};

export default ContributionDetailed;
