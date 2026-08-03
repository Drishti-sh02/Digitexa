import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { googleData, onboardData } = await req.json();

    if (!googleData || !onboardData) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const { googleId, email, fullName, profilePicture } = googleData;
    const { dob, position, company } = onboardData;

    // Check if email already exists
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Account already exists" }, { status: 400 });
    }

    const user = await db.user.create({
      data: {
        googleId,
        email,
        fullName,
        profilePicture,
        dob: new Date(dob),
        position,
        company: position === "Employee" ? company : null,
      }
    });

    // Create session
    await createSession(user.id);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("onboard error:", error);
    return NextResponse.json({ error: "Onboarding failed" }, { status: 500 });
  }
}
