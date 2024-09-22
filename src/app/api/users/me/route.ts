import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const { userId } = await getDataFromToken(request);
    console.log("this is the userId", userId);
    const user = await User.findById(userId).select(
      "-password -verifyToken -verifyTokenExpiry"
    ); // Directly pass userId

    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      // If user is not found, return a 404 response
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    // Handle errors and return a 500 response
    return NextResponse.json(
      { message: `server error ${error}` },
      { status: 500 }
    );
  }
}
