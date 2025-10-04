/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import Property from "@/models/Property";
import Room from "@/models/Room";
import { connectDB } from "@/lib/db";

// GET all for logged in user
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  let query = {};
  if (userId) {
    query = { adminIds: userId }; // only return properties where user is admin
  }

  const properties = await Property.find(query).populate("rooms");
  return NextResponse.json(properties);
}

// POST (create)
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  // ensure creator is admin
  const property = await Property.create({
    ...body,
    adminIds: body.adminIds || [],
  });

  return NextResponse.json(property, { status: 201 });
}
