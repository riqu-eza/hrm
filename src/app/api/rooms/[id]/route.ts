import { NextResponse } from "next/server";
import Room from "@/models/Room";
import Property from "@/models/Property";
import { connectDB } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updatedRoom = await Room.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updatedRoom);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deletedRoom = await Room.findByIdAndDelete(params.id);

  if (deletedRoom?.propertyId) {
    await Property.findByIdAndUpdate(deletedRoom.propertyId, {
      $pull: { rooms: deletedRoom._id },
    });
  }

  return NextResponse.json({ message: "Room deleted" });
}
