import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if(!user) {
        return NextResponse.json({
            error: "User not found!",
            status: 400
        })
    }

    console.log(user)

    user.isVerified = true;
    user.verifyToken = false;
    user.verifyTokenExpiry= undefined;

     await user.save()

     return NextResponse.json({
        message: "User verified successfully",
        success: true
     }, {status: 300})

  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
