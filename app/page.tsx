import { StoryForm } from "@/components/forms/createStory";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { ToggleTheme } from "@/components/shared/toggleTheme";

import { FC } from "react";

const Page: FC = () => {
  return (
    <section>
      <MaxWidthWrapper className="mb-12 mt-14 sm:mt-15 flex flex-col justify-between text-center">
        <ToggleTheme />
        <StoryForm />
      </MaxWidthWrapper>
    </section>
  );
};

export default Page;
