import { connect } from "@/config/mongodb.config";
import User from "@/models/user.model";
import {  NextRequest, NextResponse } from "next/server";
import { getDatafromToken } from "@/helpers/getDatafromToken";

connect();

export async function POST(NextRequest) {
  try {
    const userId = await getDatafromToken(NextRequest);

    const user = await User.findOne({_id: userId}).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message:"User found", data: user }, { status: 200 });

  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}