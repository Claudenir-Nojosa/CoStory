import { auth } from "@/lib/auth";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

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
export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    await db.user.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.username,
      },
    });
    return NextResponse.json(
      { message: "Updated User Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("erro:", error);
    return NextResponse.json(
      { message: "Could Not Update User" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = (await auth()) as Session;
    if (!session) return new Response("No session found", { status: 401 });

    const user = await db.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
      where: {
        id: session.user.id,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("Fetch User has error", error);
    return NextResponse.json(
      { message: "Could not fetch user" },
      { status: 500 }
    );
  }
}
