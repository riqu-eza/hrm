import { NextResponse } from "next/server";
import Property from "@/models/Property";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Room from "@/models/Room"; // ✅ add this
import { connectDB } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const property = await Property.findById(params.id).populate("rooms");
  return NextResponse.json(property);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const property = await Property.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(property);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Property.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
