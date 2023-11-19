import { NextResponse } from "next/server";
import { db } from "../../../lib/prismadb";
import crypto from "crypto";
import { sendEmail } from "@/config/mail";
import { render } from "@react-email/render";
import ForgotPasswordEmail from "@/emails/ForgotPassword";

export async function PATCH(req: Request, res: Response) {
  try {
    const body = await req.json();

    const existingUser = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!existingUser) {
      return new NextResponse("Email não cadastrado", { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const passwordResetExpires = new Date();
    passwordResetExpires.setHours(passwordResetExpires.getHours() + 1);

    const resetUrl = `localhost:3000/reset-password/${resetToken}`;

    const updatedUser = await db.user.update({
      where: {
        email: body.email,
      },
      data: {
        resetToken: passwordResetToken,
        resetTokenExpiry: passwordResetExpires,
      },
    });
    console.log(resetUrl);

    const html = render(
      ForgotPasswordEmail({
        params: {
          name: updatedUser.name || "",
          url: resetUrl,
        },
      })
    );

    await sendEmail(body.email, "Reset Password", html);
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(400);
  }
}
