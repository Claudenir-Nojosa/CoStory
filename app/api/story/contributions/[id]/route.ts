import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface contextProps {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();

    console.log("Request Body:", body);

    console.log("isAccepted:", body.isAccepted);

    await db.contributor.update({
      where: {
        id: params.id,
      },
      data: {
        isAccepted: body.isAccepted,
        storyId: body.storyId,
        newContent: body.newContent,
      },
    });

    // Check if isAccepted is set to true
    if (body.isAccepted) {
      const storyUpdateResponse = await db.story.update({
        where: {
          id: body.storyId, // Replace with the correct ID field for story
        },
        data: {
          additionalContent: body.additionalContent,
        },
      });

      console.log("Story Update Response:", storyUpdateResponse);
    }

    return NextResponse.json(
      { message: "Contribution Accepted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Could Not Accept Contribution" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, context: contextProps) {
  const session = await auth();
  if (!session) return new Response("No session found", { status: 401 });

  try {
    const { params } = context;
    const contribution = await db.contributor.findFirst({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        story: true,
      },
    });
    return NextResponse.json(contribution, { status: 200 });
  } catch (error) {
    if (error) console.log(error);
    return NextResponse.json(
      { message: "Could not fetch contribution" },
      { status: 500 }
    );
  }
}
