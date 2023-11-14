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

    const { isAccepted } = await req.json();
    await db.contributor.update({
      where: {
        id: params.id,
      },
      data: {
        isAccepted,
      },
    });
    return NextResponse.json(
      { message: "Contribution Accepted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("erro:", error);
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
