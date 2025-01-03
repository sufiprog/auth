import { connect } from "@/config/mongodb.config";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
