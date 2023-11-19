"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, Favorite } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { db } from "@/lib/prismadb";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import Loading from "../shared/Loading";

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    content: string;
    coverImage: string;
    category: string;
    isCompleted: boolean;
  };
}

const StoryCard: FC<StoryCardProps> = ({ story }) => {
  const { title, content, coverImage, category, isCompleted, id } = story;

  const router = useRouter();
  const session = useSession();
  const userId = session.data?.user.id as string;
  const queryClient = useQueryClient();

  // Fetch das Categorias
  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/api/story/categories");
      return response.data;
    },
  });

  const mapCategoriesIcon = (categoryId: any, dataCategories: any) => {
    if (dataCategories) {
      const category = dataCategories.find(
        (category: any) => category.id === categoryId
      );
      return category ? (
        <div className="flex gap-2 justify-start items-center text-start">
          <Image
            src={category.icon}
            alt={category.name}
            width={30}
            height={30}
          />
          <span>{category.name}</span>
        </div>
      ) : null;
    }
    return null;
  };

  const categoryIcon = mapCategoriesIcon(category, dataCategories);

  const { mutate: favoriteStory } = useMutation<Favorite, unknown>({
    mutationFn: async () => {
      const storyFavorited = {
        storyId: id,
        userId,
      };
      const existingFavorite = dataFavoritesTyped?.favorites.find(
        (favorite) => favorite.storyId === id
      );

      if (existingFavorite) {
        await axios.post("/api/story/favorite", storyFavorited);
        toast.success("História desfavoritada com sucesso!");
      } else {
        const response = await axios.post(
          "/api/story/favorite",
          storyFavorited
        );
        toast.success("História favoritada com sucesso!");
        router.refresh();
        return response.data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (data) => {
      toast.error(
        "Aconteceu um erro ao favoritar/desfavoritar a História, tente novamente"
      );
    },
  });

  const { data: dataFavorites } = useQuery<Favorite[]>({
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

  const isFavorited =
    dataFavoritesTyped &&
    dataFavoritesTyped.favorites &&
    dataFavoritesTyped.favorites.some((favorite) => favorite.storyId === id);

  const [localIsFavorited, setLocalIsFavorited] = useState(isFavorited);

  useEffect(() => {
    setLocalIsFavorited(isFavorited);
  }, [isFavorited]);

  return (
    <Card className="max-w-sm flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle className="mb-5 font-bold">{title}</CardTitle>
        <CardDescription className="flex  gap-2 justify-center items-center text-center">
          <Badge variant="outline">
            {isLoadingCategories ? <Loading /> : categoryIcon}
          </Badge>
          <Badge
            variant="outline"
            className={`${
              isCompleted ? "text-green-500" : "text-red-500"
            } p-2 px-4`}
          >
            {isCompleted ? "Completo" : "Incompleto"}
          </Badge>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => favoriteStory()}
          >
            <Heart
              className={isFavorited ? "fill-red-500 text-transparent" : ""}
            />
          </Button>
        </CardDescription>
        <Image
          src={coverImage}
          alt="Capa da História"
          height={259}
          width={259}
          className="rounded-xl"
        />
      </CardHeader>
      <CardFooter>
        <Button variant="outline">
          <Link href={`/stories/${id}`} className="hover:underline">
            Ler história
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
