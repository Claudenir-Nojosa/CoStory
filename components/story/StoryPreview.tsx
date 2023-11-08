import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { FC } from "react";

interface StoryPreviewProps {
  title: string;
  content: string;
  category?: string;
  coverImage?: string;
}

const StoryPreview: FC<StoryPreviewProps> = ({
  title,
  content,
  category,
  coverImage,
}) => {
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
    <div className="overflow-y-scroll overflow-x-scroll flex flex-col items-center bg-background rounded-lg p-5 gap-2">
      {coverImage && (
        <Image src={coverImage} alt={title} height={250} width={250} />
      )}
      <h1 className="text-3xl font-bold">{title}</h1>
      {category && <h2>{categoryIcon}</h2>}

      <div className="mt-10" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default StoryPreview;
