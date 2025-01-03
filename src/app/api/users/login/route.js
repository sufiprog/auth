import { connect } from "@/config/mongodb.config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
    try {
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}