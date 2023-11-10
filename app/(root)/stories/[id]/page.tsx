import { db } from "@/lib/prismadb";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      isCompleted: true,
      category: true,
      content: true,
      Contributor: true,
      User: true,
    },
  });
  return response;
}

const StoryDetailPage: FC<StoryDetailPageProps> = async ({ params }) => {
  const story = await getStory(params.id);
  const session = await auth();
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
                          <Image
                            src="/assets/edit.svg"
                            alt="Editar"
                            width={30}
                            height={30}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar história</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Image
                            src="/assets/delete.svg"
                            alt="Editar"
                            width={30}
                            height={30}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Deletar história</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src="/assets/contribute.svg"
                          alt="Editar"
                          width={30}
                          height={30}
                        />
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
          {story?.content && (
            <div
              className="mt-10"
              dangerouslySetInnerHTML={{ __html: story?.content }}
            />
          )}
        </CardContent>
        <CardFooter className="mt-8 text-gray-500"></CardFooter>
      </Card>
      <div>TOC</div>
    </MaxWidthWrapper>
  );
};

export default StoryDetailPage;
