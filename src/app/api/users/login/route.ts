import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
    // match the password
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

    //create token data
        const tokenData = {
            id: userDetails._id,
            username: userDetails.username,
            email: userDetails.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

  } catch (err: unknown) {
    console.error("Error in Post Handler:", err);

    const message = err instanceof Error ? err.message : "Something went wrong";

    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
