import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (session === null) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const story = await db.story.create({
      data: {
        title: body.title,
        content: body.content,
        category: "YourCategoryValue",
        coverImage: body.coverImage,
        isCompleted: false,
        User: {
          connect: {
            id: session.user.id as string,
          },
        },
      },
    });
    return NextResponse.json(story, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Could not create story" },
      { status: 500 }
    );
  }
}
