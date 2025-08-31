import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

connect();

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: savedUser,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Error in POST handler:", err);

    const message = err instanceof Error ? err.message : "Something went wrong";

    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
