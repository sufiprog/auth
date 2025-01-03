import { connect } from "@/config/mongodb.config";
import { getDatafromToken } from "@/helpers/getDatafromToken";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const userId = await getDatafromToken(request);
    const user = User.findOne({ _id: userId }).select("-password");

    // If there is no user
    return NextResponse.json({ message: "User found" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, data: user });
  }
}
