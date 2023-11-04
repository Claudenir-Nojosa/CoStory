import { Loader2 } from "lucide-react";

const Icons = {
  spinner: Loader2,
};

const Loading = () => {
  return (
    <div className="text-center">
      <Icons.spinner className="h-4 w-4 animate-spin" />
    </div>
  );
};

export default Loading;
