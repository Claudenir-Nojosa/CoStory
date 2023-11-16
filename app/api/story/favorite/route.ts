import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

interface Session {
  user: {
    id: string;
  };
}

export async function POST(req: Request) {
  try {
    const session = (await auth()) as Session;
    if (!session) return new Response("No session found", { status: 401 });

    const body = await req.json();

    const existingFavorite = await db.favorite.findFirst({
      where: {
        userId: session.user.id,
        storyId: body.storyId,
      },
    });

    if (existingFavorite) {
      await db.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });

      return NextResponse.json(
        { message: "Story removed from favorites" },
        { status: 200 }
      );
    }

    const newFavorite = await db.favorite.create({
      data: {
        user: {
          connect: {
            id: session.user.id as string,
          },
        },
        story: {
          connect: {
            id: body.storyId,
          },
        },
      },
    });
    return NextResponse.json(newFavorite, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Could not update favorites" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = (await auth()) as Session;
    if (!session) return new Response("No session found", { status: 401 });

    const favorites = await db.favorite.findMany({
      select: {
        id: true,
        userId: true,
        storyId: true,
        user: true,
        story: true,
      },
      where: {
        userId: session.user.id,
      },
    });
    return NextResponse.json({ favorites }, { status: 200 });
  } catch (error) {
    console.log("Fetch favorites has errors:", error);
    return NextResponse.json(
      { message: "Could not fetch favorites" },
      { status: 500 }
    );
  }
}
