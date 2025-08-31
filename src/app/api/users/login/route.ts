import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

connect();

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Check if username is present or not
    const userDetails = await User.findOne({ username });
    if (!userDetails) {
      return NextResponse.json(
        { success: false, error: "Username is not present!" },
        { status: 400 }
      );
    }
    // we have to hash the password to match
    const isPasswordMatch = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, error: "Password is Wrong!" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Login Success" },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error in Post Handler:", err);

    const message = err instanceof Error ? err.message : "Something went wrong";

    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
