import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Tenant from "@/models/Tenant";
import Room from "@/models/Room";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const tenant = await Tenant.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(tenant);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const tenant = await Tenant.findById(params.id);
  if (!tenant) return NextResponse.json({ error: "Tenant not found" }, { status: 404 });

  // Free up the room
  await Room.findByIdAndUpdate(tenant.roomId, {
    status: "available",
    tenantId: null,
  });

  // Delete the tenant
  await Tenant.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Tenant deleted and room freed" });
}
