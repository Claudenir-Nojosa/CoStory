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
import { User } from "@prisma/client";
import { FC } from "react";

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    content: string;
  };
}

const StoryCard: FC<StoryCardProps> = ({ story }) => {
  const { title, content } = story;
  return (
    <Card className="max-w-sm flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
