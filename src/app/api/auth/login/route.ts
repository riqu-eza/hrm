import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        orgId: user.orgId,
        vendorId: user.vendorId,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );    return NextResponse.json(
      { message: "Login successful", user, token },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
