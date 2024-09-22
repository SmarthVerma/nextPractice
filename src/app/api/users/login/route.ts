import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 500 }
      );
    }

    const passwordValid = await bcryptjs.compare(password, user.password);

    if (!passwordValid) {
      return NextResponse.json(
        {
          message: "Password invalid",
          success: false,
        },
        { status: 400 }
      );
    }

    // now will make token

    const tokenPayload = {
      userId: user._id,
    };

    const accessToken = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

    const response = NextResponse.json({
      message: "Logged in successfully",
      success: 200,
    });

    response.cookies.set("token", accessToken, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
    }, {status: 500});
  }
}
