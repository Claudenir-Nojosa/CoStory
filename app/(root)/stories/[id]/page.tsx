import StoryDetailPage from "@/components/story/StoryDetail";
import React, { FC } from "react";

interface StoryDetailPageProps {
  params: {
    id: string;
  };
}

const StoryDetailedPage: FC<StoryDetailPageProps> = ({ params }) => {
  const id = params;
  return <StoryDetailPage params={id} />;
};

export default StoryDetailedPage;
