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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    },
  });
  return response;
}

const StoryDetailPage: FC<StoryDetailPageProps> = async ({ params }) => {
  const story = await getStory(params.id);

  return <section>{story?.id}</section>;
};

export default StoryDetailPage;
