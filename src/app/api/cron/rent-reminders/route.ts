import { NextResponse } from "next/server";
import { sendRentDueReminders, sendRentOverdueWarnings } from "@/lib/notifications";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    await sendRentDueReminders();
    await sendRentOverdueWarnings();

    return NextResponse.json({ success: true, message: "Rent reminders sent" });
  } catch (err) {
    console.error("Reminder error:", err);
    return NextResponse.json({ success: false, message: "Failed to send" });
  }
}
