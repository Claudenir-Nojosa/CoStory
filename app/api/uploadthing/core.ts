import { db } from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const uploadThingFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getToken({ req });

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { ...user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const user = await db.user.findUnique({
        where: {
          id: metadata.id as string,
        },
      });
      if (!user) throw new Error("No user found");

      db.user.update({
        where: {
          id: metadata.id as string,
        },
        data: {
          ...user,
          image: file.url,
        },
      });
    }),
} satisfies FileRouter;

export type uploadThingFileRouter = typeof uploadThingFileRouter;
