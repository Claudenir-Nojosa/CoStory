import { StoryForm } from "@/components/forms/createStory";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { FC } from "react";

const Page: FC = () => {
  return (
    <section>
      <MaxWidthWrapper className="mb-12 mt-14 sm:mt-15 flex flex-col justify-between text-center">
        <StoryForm />
      </MaxWidthWrapper>
    </section>
  );
};

export default Page;
