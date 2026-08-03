import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json({ error: "Missing credential" }, { status: 400 });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 400 });
    }

    const { sub: googleId, email, name: fullName, picture: profilePicture } = payload;
    
    if (!email) {
      return NextResponse.json({ error: "Google account does not have an email" }, { status: 400 });
    }

    // Check if user exists
    let user = await db.user.findUnique({
      where: { googleId }
    });

    if (!user) {
      // User doesn't exist, we need to onboard them.
      // But wait! Did they register with email before?
      // Since we dropped old OTP flow, we'll just check if email exists.
      user = await db.user.findUnique({ where: { email } });
      
      if (user) {
        // Link google account to existing email
        user = await db.user.update({
          where: { email },
          data: { googleId, profilePicture }
        });
      }
    }

    if (!user) {
      // Return temporary data so frontend can show onboarding
      return NextResponse.json({
        isNewUser: true,
        googleData: { googleId, email, fullName, profilePicture }
      });
    }

    // Create session for existing user
    await createSession(user.id);
    return NextResponse.json({ isNewUser: false, user });

  } catch (error) {
    console.error("google auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
