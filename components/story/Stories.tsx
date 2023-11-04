"use client";

import StoryCard from "@/components/story/StoryCard";
import { Story } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Stories = () => {
  const {
    data: dataStories,
    isLoading: isLoadingStories,
    isError: isErrorStories,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/story");
      return data.stories as Story[];
    },
  });

  return (
    <div>
      <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 ">
        {dataStories?.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Stories;
