import Stories from "@/components/story/Stories";
import { auth } from "@/lib/auth";

const Page = async () => {
  const session: any = await auth();

  return (
    <section className="text-3xl font-semibold">
      {!session?.user ? (
        <p>Por gentileza, realize o login</p>
      ) : (
        <div>
          <p>Olá, {session?.user.name}</p>
          <Stories />
        </div>
      )}
    </section>
  );
};

export default Page;
