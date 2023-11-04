import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch categories" },
      { status: 500 }
    );
  }
}
