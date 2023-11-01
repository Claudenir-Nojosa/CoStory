import { db } from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, roomId } = await req.json();

    pusherServer.trigger(roomId, "incoming-message", text);

    const message = await db.message.create({
      data: {
        text,
        chatRoomId: roomId,
      },
    });
    console.log(message);
    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Could not create new message" },
      { status: 500 }
    );
  }
}
