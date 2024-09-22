import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendEmail } from "@/helpers/mailer";
import { EMAIL_VERIFICATION } from "@/constants/constants";

connect();

export async function GET(request: NextRequest) {
  try {
    const { userId } = await getDataFromToken(request);
    console.log("this is the userId", userId);
    const user = await User.findById(userId).select(
      "-password -verifyToken -verifyTokenExpiry"
    ); // Directly pass userId

    if (!user) {
      return NextResponse.json(
        { message: `something went wrong: user not found` },
        { status: 404 }
      );
    }

    await sendEmail({
      email: user.email,
      emailType: EMAIL_VERIFICATION,
      userId: user._id,
    });

    return NextResponse.json(
      {
        message: `Verification email sent successfully to email ${user.email}`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    // Handle errors and return a 500 response
    return NextResponse.json(
      { message: `server error ${error}` },
      { status: 500 }
    );
  }
}
