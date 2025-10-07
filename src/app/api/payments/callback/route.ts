/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import Ledger from "@/models/Ledger";
import Tenant from "@/models/Tenant";
import Room from "@/models/Room";
import { connectDB } from "@/lib/db";
import { notifyPaymentReceived } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      TransID,          // Unique M-Pesa transaction ID
      TransAmount,      // Amount paid
      BillRefNumber,    // Room Account Number
      MSISDN,           // Payer phone
      FirstName,
      LastName,
      TransTime,        // e.g. "20251007123045"
    } = body;

    // ✅ Prevent duplicate payments
    const existing = await Payment.findOne({ reference: TransID });
    if (existing)
      return NextResponse.json({
        ResultCode: 0,
        ResultDesc: "Duplicate Ignored",
      });

    // ✅ Identify the room via the Bill Reference Number (your unique account no)
    const room = await Room.findOne({ name: BillRefNumber });
    if (!room)
      return NextResponse.json({
        ResultCode: 1,
        ResultDesc: "Unknown Account",
      });

    // ✅ Find the tenant linked to that room
    const tenant = await Tenant.findOne({ roomId: room._id }).populate("propertyId");
    if (!tenant)
      return NextResponse.json({
        ResultCode: 1,
        ResultDesc: "Unknown Tenant",
      });

    // ✅ Create Payment Record
    const payment = await Payment.create({
      tenantId: tenant._id,
      propertyId: tenant.propertyId,
      roomId: room._id,
      amount: Number(TransAmount),
      method: "mpesa",
      status: "paid",
      reference: TransID,
      date: new Date(),
    });

await notifyPaymentReceived(tenant._id, Number(TransAmount));
    // ✅ Update Ledger (find or create per room)
    let ledger = await Ledger.findOne({ roomId: room._id });

    if (!ledger) {
      ledger = await Ledger.create({
        propertyId: tenant.propertyId,
        roomId: room._id,
        entries: [],
        totalPaid: 0,
        totalDue: 0,
        balance: 0,
      });
    }

    // ✅ Add new payment as a ledger entry
    ledger.entries.push({
      tenantId: tenant._id,
      paymentId: payment._id,
      type: "credit",
      amount: Number(TransAmount),
      date: new Date(),
      description: `Rent payment via M-Pesa (${TransID})`,
    });

    // ✅ Update totals & balance
    ledger.totalPaid += Number(TransAmount);
    ledger.balance = ledger.totalPaid - ledger.totalDue;

    await ledger.save();

    // ✅ Update Room & Tenant statuses
    if (room.status !== "occupied") {
      room.status = "occupied";
      await room.save();
    }

    if (!tenant.active) {
      tenant.active = true;
      await tenant.save();
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("💥 Daraja Callback Error:", error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Internal Error" });
  }
}
