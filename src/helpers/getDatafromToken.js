import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDatafromToken = (NextRequest) => {
  try {
    const token = NextRequest.cookies.get("token").value;

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
