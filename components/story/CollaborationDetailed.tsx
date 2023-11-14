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

interface ContributionDetailPageProps {
  params: {
    id: string;
  };
}

async function getContribution(id: string) {
  const response = await db.contributor.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      isCompleted: true,
      userId: true,
      storyId: true,
      isAccepted: true,
      newContent: true,
      user: true,
      story: true,
    },
  });
  return response;
}

const formatDate = (date: string | Date) => {
  const parsedDate =
    typeof date === "string"
      ? parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", new Date())
      : date;
  return format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
};
const ContributionDetailed: FC<ContributionDetailPageProps> = async ({
  params,
}) => {
  const contribution = await getContribution(params.id);
  const session = await auth();
  return (
    <MaxWidthWrapper>
      {contribution && (
        <Card>
          <CardHeader>
            <div className="flex gap-2 flex-col items-center">
              <Avatar className="ml-4">
                {typeof contribution.user.image === "string" ? (
                  <AvatarImage src={contribution.user.image} />
                ) : (
                  ""
                )}
              </Avatar>
              <p className="text-2xl font-semibold">
                Contribuição de: {contribution.user.name}
              </p>
              <p className="text-muted-foreground font-semibold">
                Criado dia: {formatDate(contribution.createdAt)}
              </p>
              <div className="flex gap-2">
                <h3 className="text-muted-foreground ">Está aceita ?</h3>
                <Badge> {contribution.isAccepted ? "Sim" : "Não"}</Badge>
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
                        __html: contribution.story.content,
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
              dangerouslySetInnerHTML={{ __html: contribution.newContent }}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            {contribution.story.userId === session?.user.id ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/">
                      <Button size={"icon"} variant={"link"}>
                        <Image
                          src="/assets/accept.svg"
                          alt="Aceitar contribuição"
                          width={30}
                          height={30}
                        />
                      </Button>
                    </Link>
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
