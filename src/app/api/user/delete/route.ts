import { NextResponse } from "next/server";
import { getSession, destroySession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete user from db. Cascade will handle Session/VerificationToken relations if they exist,
    // though VerificationToken doesn't have a direct foreign key. 
    const user = await db.user.findUnique({ where: { id: session.userId }});

    if (user) {
      await db.user.delete({
        where: { id: session.userId }
      });
    }

    // Destroy session cookie
    await destroySession();

    return NextResponse.json({ success: true, message: "Account deleted permanently" });
  } catch (error) {
    console.error("delete-account error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
