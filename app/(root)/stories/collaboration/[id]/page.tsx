"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import Loading from "@/components/shared/Loading";
import { StoryForm } from "@/components/forms/createStory";

interface ColabborationStoryPageProps {
  params: {
    id: string;
  };
}

const CollaborationStoryPage: FC<ColabborationStoryPageProps> = ({ params }) => {
  const { id } = params;

  const { data: dataStory, isLoading: isLoadingStory } = useQuery({
    queryKey: ["stories", id],
    queryFn: async () => {
      const response = await axios.get(`/api/story/${id}`);
      return response.data;
    },
  });
  console.log(dataStory);

  if (isLoadingStory) {
    return (
      <MaxWidthWrapper className="flex flex-col justify-center items-center text-center min-h-full">
        <Loading />
      </MaxWidthWrapper>
    );
  }

  const initialFormValues = {
    title: dataStory.title,
    content: dataStory.content,
    coverImage: dataStory.coverImage,
    category: dataStory.category,
    isCompleted: dataStory.isCompleted,
  };

  return (
    <StoryForm
      isEditing={true}
      params={params}
      initialValue={initialFormValues}
      isCollaboration={true}
    />
  );
};

export default CollaborationStoryPage;
