import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface Session {
  user: {
    id: string;
  };
}

export async function GET() {
  const session = await auth() as Session;
  if (!session) return new Response("No session found", { status: 401 });

  try {
    const stories = await db.story.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        coverImage: true,
        isCompleted: true,
        userId: true,
        User: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        userId: session.user.id,
      },
    });
    return NextResponse.json({ stories }, { status: 200 });
  } catch (error) {
    console.log("Fetch stories has errors:", error);
    return NextResponse.json(
      { message: "Could not fetch stories" },
      { status: 500 }
    );
  }
}
