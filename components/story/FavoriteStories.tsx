"use client";

import StoryCard from "@/components/story/StoryCard";
import { Favorite, Story } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import Loading from "../shared/Loading";

const FavoriteStories = () => {
  const { data: dataFavorites, isLoading: isLoadingFavoriteStories } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await axios.get("/api/story/favorite");
      return response.data;
    },
  });
  console.log(dataFavorites);

  const dataFavoritesTyped = dataFavorites as
  | { favorites: Favorite[] }
  | undefined;

  if (isLoadingFavoriteStories) {
    return (
      <MaxWidthWrapper className="flex justify-center items-center mt-56">
        <Loading />
      </MaxWidthWrapper>
    );
  }

  return (
    <div>
      <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 ">
      {dataFavoritesTyped?.favorites.map((favorite) => (
        <StoryCard
          key={favorite.id}
          story={{
            id: favorite.storyId,
            title: favorite.storyId,
            content: favorite.storyId,
            coverImage: "",
            category: favorite.storyId,
            isCompleted: true,
          }}
        />
      ))}
      </div>
    </div>
  );
};

export default FavoriteStories;
