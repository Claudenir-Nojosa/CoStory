import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "../../../lib/prismadb";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { email, name, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
