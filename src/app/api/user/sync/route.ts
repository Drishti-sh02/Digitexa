import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: {
        cartItemIds: true,
        likedItemIds: true,
        downloadItemIds: true,
        purchasedItemIds: true,
        purchaseDates: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, syncData: user });
  } catch (error) {
    console.error("Sync GET error:", error);
    return NextResponse.json({ error: "Failed to fetch sync data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const user = await db.user.update({
      where: { id: session.userId },
      data: {
        cartItemIds: body.cartItemIds ?? undefined,
        likedItemIds: body.likedItemIds ?? undefined,
        downloadItemIds: body.downloadItemIds ?? undefined,
        purchasedItemIds: body.purchasedItemIds ?? undefined,
        purchaseDates: body.purchaseDates ?? undefined,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync POST error:", error);
    return NextResponse.json({ error: "Failed to save sync data" }, { status: 500 });
  }
}
