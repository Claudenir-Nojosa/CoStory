import { FC } from "react";
import { StoryForm } from "@/components/forms/createStory";

interface CreateStoryPageProps {
  params: {
    id: string;
  };
}

const CreateStory: FC<CreateStoryPageProps> = ({ params }) => {
  return (
    <section>
      <StoryForm isEditing={false} params={params} />
    </section>
  );
};

export default CreateStory;
