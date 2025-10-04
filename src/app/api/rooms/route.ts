import { NextResponse } from "next/server";
import Room from "@/models/Room";
import { connectDB } from "@/lib/db";
import Property from "@/models/Property";

// CREATE Room
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const room = await Room.create(body);
  await Property.findByIdAndUpdate(body.propertyId, {
    $push: { rooms: room._id },
  });
  return NextResponse.json(room, { status: 201 });
}
