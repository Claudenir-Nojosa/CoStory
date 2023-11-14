import ContributionDetailed from "@/components/story/CollaborationDetailed";
import React, { FC } from "react";

interface ContributionDetailPageProps {
  params: {
    id: string;
  };
}

const ContributionDetailedPage: FC<ContributionDetailPageProps> = ({ params }) => {
  const id = params;
  return <ContributionDetailed params={id}/>
};

export default ContributionDetailedPage;
