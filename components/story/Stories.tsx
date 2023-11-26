"use client";

import StoryCard from "@/components/story/StoryCard";
import { Story } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import Loading from "../shared/Loading";

const Stories = () => {
  const { data: dataStories, isLoading: isLoadingStories } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/story");
      return data.stories as Story[];
    },
  });
  
  if (isLoadingStories) {
    return (
      <MaxWidthWrapper className="flex justify-center items-center mt-56 ">
        <Loading />
      </MaxWidthWrapper>
    );
  }

  return (
    <div>
      <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 font-bold text-center">
      {dataStories?.length === 0 ? (
          <p className="text-2xl font-semibold text-muted-foreground">
            Ops, como está vazio aqui...
          </p>
        ) : (
          dataStories?.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))
        )}
      </div>     
    </div>
  );
};

export default Stories;
