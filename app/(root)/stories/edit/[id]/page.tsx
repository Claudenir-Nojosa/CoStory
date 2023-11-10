"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import Loading from "@/components/shared/Loading";
import { StoryForm } from "@/components/forms/createStory";

interface EditStoryPageProps {
  params: {
    id: string;
  };
}

const EditStoryPage: FC<EditStoryPageProps> = ({ params }) => {
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

  return <StoryForm />;
};

export default EditStoryPage;
