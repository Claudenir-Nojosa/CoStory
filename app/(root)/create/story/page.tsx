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
      <StoryForm isEditing={false} params={params} isCollaboration={false} />
    </section>
  );
};

export default CreateStory;
