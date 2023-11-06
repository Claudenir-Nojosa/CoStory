import {
  Card,
  CardContent,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Category, Favorite } from "@prisma/client";
import axios from "axios";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { db } from "@/lib/prismadb";

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
  const { title, content, coverImage, category, isCompleted } = story;
  const router = useRouter();
  const session = useSession();
  const userId = session.data?.user.id as string;

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
  // Fetch dos favoritos
  const { data: dataFavorites, isLoading: isLoadingFavorites } = useQuery<
    Favorite[]
  >({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await axios.get("/api/story/byUser/favorites");
      return response.data;
    },
  });
  console.log(dataFavorites);

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

  // POST para Favoritar História
  const { mutate: favoritarStory } = useMutation<
    Favorite,
    Error,
    { userId: string; storyId: string }
  >({
    mutationFn: async (newFavoriteData) => {
      const response = await axios.post(
        "/api/story/byUser/favorites",
        newFavoriteData
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("História favoritada com sucesso!");
    },
    onError: (data) => {
      toast.error("Aconteceu um erro ao favoritar a História, tente novamente");
    },
  });

  const handleFavoritarClick = () => {
    if (userId) {
      const storyId = story.id;
      favoritarStory({ userId, storyId });
    }
  };

  return (
    <Card className="max-w-sm flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle className="mb-5">{title}</CardTitle>
        <CardDescription className="flex  gap-2 justify-center items-center text-center">
          <Badge variant="outline">{categoryIcon}</Badge>
          <Badge
            variant="outline"
            className={`${isCompleted ? "text-green-500" : "text-red-500"} p-2 px-4`}
          >
            {isCompleted ? "Completo" : "Incompleto"}
          </Badge>
          <Button variant="ghost" size="icon" onClick={handleFavoritarClick}>
            <Heart />
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
          <Link href="/stories/1" className="hover:underline">
            Ler história
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
