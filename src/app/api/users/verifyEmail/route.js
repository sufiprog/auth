import { connect } from "@/config/mongodb.config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Received token:", token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Invalid or expired token");
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Update the user's verification status
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 });

  } catch (error) {
    console.error("Error during email verification:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}