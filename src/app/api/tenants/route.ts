import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Tenant from "@/models/Tenant";
import Room from "@/models/Room";
import Property from "@/models/Property";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const propertyId = searchParams.get("propertyId");

  let query = {};
  if (propertyId) query = { propertyId };

  const tenants = await Tenant.find(query)
    .populate("roomId")
    .populate("propertyId");

  return NextResponse.json(tenants);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  // 1️⃣ Create tenant
  const tenant = await Tenant.create(body);

  // 2️⃣ Update room status to occupied
  await Room.findByIdAndUpdate(body.roomId, {
    status: "occupied",
    tenantId: tenant._id,
  });

  return NextResponse.json(tenant, { status: 201 });
}
