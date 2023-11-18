"use client";

import StoryCard from "@/components/story/StoryCard";
import { Favorite, Story } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import Loading from "../shared/Loading";

const FavoriteStories = () => {
  const { data: dataFavorites, isLoading: isLoadingFavoriteStories } = useQuery(
    {
      queryKey: ["favorites"],
      queryFn: async () => {
        const response = await axios.get("/api/story/favorite");
        return response.data;
      },
    }
  );
  console.log(dataFavorites);

  const dataFavoritesTyped = dataFavorites as { favorites: any } | undefined;

  if (isLoadingFavoriteStories) {
    return (
      <MaxWidthWrapper className="flex justify-center items-center mt-56">
        <Loading />
      </MaxWidthWrapper>
    );
  }

  return (
    <div>
      <div className="grid xl:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        {dataFavoritesTyped?.favorites.length > 0 ? (
          <div>
            {dataFavoritesTyped?.favorites.map((favorite: any) => (
              <StoryCard
                key={favorite.id}
                story={{
                  id: favorite.storyId,
                  title: favorite.story.title,
                  content: favorite.story.content,
                  coverImage: favorite.story.coverImage,
                  category: favorite.story.category,
                  isCompleted: favorite.story.isCompleted,
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-2xl font-semibold text-muted-foreground">
            Ops, como está vazio aqui...
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoriteStories;
