import LandingPage from "@/components/landingpage/LandingPage";
import Stories from "@/components/story/Stories";
import { auth } from "@/lib/auth";

const Page = async () => {
  const session: any = await auth();

  return (
    <section className="text-3xl font-semibold">
      {!session?.user ? (
        <LandingPage />
      ) : (
        <div>
          <Stories />
        </div>
      )}
    </section>
  );
};

export default Page;
