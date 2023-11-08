import { db } from "@/lib/prismadb";
import React, { FC } from "react";

interface StoryDetailPageProps {
  params: {
    id: string;
  };
}

const StoryDetailPage: FC<StoryDetailPageProps> = async ({ params }) => {
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
  const story = await getStory(params.id);

  return <section>{story?.id}</section>;
};

export default StoryDetailPage;
