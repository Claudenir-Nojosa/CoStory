import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stories = await db.story.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        coverImage: true,
        User: true,
      },
      orderBy: {
        updatedAt: "desc",
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
