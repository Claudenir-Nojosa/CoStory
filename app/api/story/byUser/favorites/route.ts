import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

interface Session {
  user: {
    id: string;
  };
}
interface contextProps {
  params: {
    id: string;
  };
}

export async function POST(req: Request) {
  try {
    const session = (await auth()) as Session;
    if (!session) return new Response("No session found", { status: 401 });

    const body = await req.json();
    const favorites = await db.favorite.create({
      data: {
        userId: body.userId,
        storyId: body.storyId,
      },
    });
    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Could not favorite story" },
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

export async function DELETE(req: Request, context: contextProps) {
  try {
    const session = (await auth()) as Session;
    if (!session) return new Response("No session found", { status: 401 });
    const { params } = context;

    const favorite = await db.favorite.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!favorite) {
      return new Response("Favorite not found", { status: 404 });
    }

    await db.favorite.delete({
      where: {
        id: params.id,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("erro:", error);
    return NextResponse.json(
      { message: "Could Not Delete Favorite" },
      { status: 500 }
    );
  }
}
