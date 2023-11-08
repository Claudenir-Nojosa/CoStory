import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { createUploadthing, type FileRouter } from "uploadthing/next";

interface Session {
  user: {
    id: string;
  };
}
const f = createUploadthing();

// Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const uploadThingFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async (req) => {
      // This code runs on your server before upload
      const session = (await auth()) as Session;
      const authUT = (req: any) => ({ id: session.user.id });
      const user = await authUT(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const user = await db.user.findUnique({
        where: {
          id: metadata.userId,
        },
      });
      if (!user) throw new Error("No user found");

      await db.user.update({
        where: {
          id: metadata.userId,
        },
        data: {
          image: file.url,
        },
      });
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type uploadThingFileRouter = typeof uploadThingFileRouter;
