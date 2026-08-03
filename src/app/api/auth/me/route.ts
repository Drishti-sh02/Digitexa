import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ user: null });
    }

    const user = await db.user.findUnique({
      where: { id: session.userId }
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
