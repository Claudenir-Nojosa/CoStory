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

interface StoryDetailPageProps {
  params: {
    id: string;
  };
}

async function getStory(id: string) {
  const response = await db.story.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      coverImage: true,
      updatedAt: true,
      isCompleted: true,
      category: true,
      content: true,
      Contributor: true,
      User: true,
      additionalContent: true,
    },
  });
  return response;
}

const StoryDetailPage: FC<StoryDetailPageProps> = async ({ params }) => {
  const story = await getStory(params.id);
  const session = await auth();

  const hasAcceptedContributor =
    story?.Contributor?.some(
      (contributor) =>
        contributor.isAccepted && contributor.updatedAt > story.updatedAt
    ) ?? false;

  return (
    <MaxWidthWrapper className="flex gap-10">
      <Card className="w-3/4">
        <CardHeader>
          <div className="flex justify-end">
            {story?.User.image && (
              <div className="flex flex-col justify-end items-end gap-4">
                <div className="flex justify-end items-center gap-3">
                  <p>Criado por {story?.User.name}</p>
                  <Avatar>
                    <AvatarImage src={story.User.image} />
                  </Avatar>
                </div>
                {session?.user.id === story.User.id ? (
                  <TooltipProvider>
                    <div className="flex gap-4">
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={`/stories/edit/${story.id}`}>
                            <Image
                              src="/assets/edit.svg"
                              alt="Editar"
                              width={30}
                              height={30}
                            />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar história</p>
                        </TooltipContent>
                      </Tooltip>
                      <AlertDialog>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertDialogTrigger>
                              <Image
                                src="/assets/delete.svg"
                                alt="Editar"
                                width={30}
                                height={30}
                              />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Você tem certeza disso?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Essa ação não pode ser desfeita. Isso irá
                                  remover permanentemente a história dos nossos
                                  servidores.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction>
                                  <DeleteStory id={params.id} />
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </TooltipTrigger>
                          <TooltipContent>Deletar história</TooltipContent>
                        </Tooltip>
                      </AlertDialog>
                    </div>
                  </TooltipProvider>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={`/stories/collaboration/${story.id}`}>
                          <div>
                            <Image
                              src="/assets/contribute.svg"
                              alt="Contribuir"
                              width={30}
                              height={30}
                            />
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Contribuir com a história</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            {story?.coverImage && (
              <Image
                src={story.coverImage}
                alt={story.title}
                height={300}
                width={300}
              />
            )}
            <CardTitle className="text-4xl font-bold mb-4">
              {story?.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-secondary-foreground">
          {!hasAcceptedContributor ? (
            <div
              className="mt-10"
              dangerouslySetInnerHTML={{ __html: story?.content ?? "" }}
            />
          ) : (
            <div
              className="mt-10"
              dangerouslySetInnerHTML={{
                __html: story?.additionalContent ?? "",
              }}
            />
          )}
        </CardContent>
        <CardFooter className="mt-8 text-gray-500"></CardFooter>
      </Card>
      <div className="w-1/3">
        <Contributions />
      </div>
    </MaxWidthWrapper>
  );
};

export default StoryDetailPage;
