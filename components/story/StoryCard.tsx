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
import { FC } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import axios from "axios";

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    content: string;
    coverImage: string;
    category: string;
  };
}

const StoryCard: FC<StoryCardProps> = ({ story }) => {
  const { title, content, coverImage, category } = story;
  console.log(category);

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

  return (
    <Card className="max-w-sm flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <Badge variant="outline">{categoryIcon}</Badge>
        </CardDescription>
        <Image
          src={coverImage}
          alt="Capa da História"
          height={300}
          width={300}
          className="rounded-xl"
        />
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">
          <Link href="/stories/1" className="hover:underline">
            Ler mais...
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
