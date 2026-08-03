import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, website, date, time, project } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save booking to the database
    const booking = await prisma.callBooking.create({
      data: {
        name,
        email,
        phone,
        company,
        website,
        date,
        time,
        project,
      },
    });

    try {
      // Send Confirmation Email to Customer
      await resend.emails.send({
        from: "Digitexa <no-reply@digitexa.co.in>",
        to: email,
        subject: "Your Digitexa Call Has Been Scheduled",
        text: `Hi ${name},

Thank you for scheduling a call with Digitexa.

Your booking details:

Date: ${date}
Time: ${time}

Our team will contact you at the scheduled time.

If you need to reschedule, simply reply to this email.

Thank you,
Digitexa Team`,
      });

      // Send Notification Email to Admin
      await resend.emails.send({
        from: "Digitexa <no-reply@digitexa.co.in>",
        to: "digitexatech@gmail.com",
        subject: "New Schedule Call Booking",
        text: `A new call has been scheduled.

Name:
${name}

Email:
${email}

Phone:
${phone}

Date:
${date}

Time:
${time}

Message:
${project || "N/A"}

Booking Time:
${new Date().toLocaleString()}
`,
      });

      return NextResponse.json({
        success: true,
        message: "Your call has been scheduled successfully. We've sent a confirmation email.",
        bookingId: booking.id,
      });
    } catch (emailError) {
      console.error("Failed to send emails:", emailError);
      return NextResponse.json(
        {
          success: true,
          message: "Your call was scheduled, but we couldn't send the confirmation emails.",
          bookingId: booking.id,
          partialSuccess: true,
        },
        { status: 207 } // 207 Multi-Status / Partial Success
      );
    }
  } catch (error) {
    console.error("Error saving booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to schedule call. Please try again later." },
      { status: 500 }
    );
  }
}
