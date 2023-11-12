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

    const contribution = await db.contributor.create({
      data: {
        newContent: body.content,
        isCompleted: body.isCompleted,
        isAccepted: false,
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
    return NextResponse.json(contribution, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Could not create contribution" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contributions = await db.contributor.findMany({
      select: {
        id: true,
        createdAt: true,
        userId: true,
        user: true,
        storyId: true,
        isAccepted: true,
        isCompleted: true,
        newContent: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json({ contributions }, { status: 200 });
  } catch (error) {
    console.log("Fetch contributions has errors:", error);
    return NextResponse.json(
      { message: "Could not fetch contributions" },
      { status: 500 }
    );
  }
}