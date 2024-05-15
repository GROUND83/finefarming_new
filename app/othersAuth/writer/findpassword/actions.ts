"use server";
import db from "@/lib/db";
import temp_pw_issuance from "@/lib/generatePassword";
import findPasswordTemlplate from "@/lib/mailtemplate/findpasswordTemplte";
import sendMail from "@/lib/sendMail/sendMail";
import bcrypt from "bcrypt";

export default async function findPassword(email: string) {
  //
  if (email) {
    let user = await db.writer.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      if (user.provider === "email") {
        //
        let temppasswrd = temp_pw_issuance();
        console.log("temp", temppasswrd);
        const hashedPasswrod = await bcrypt.hash(temppasswrd, 12);
        let updateuser = await db.writer.update({
          where: {
            email: email,
          },
          data: {
            password: hashedPasswrod,
          },
        });
        console.log("updateuser", updateuser);
        if (updateuser) {
          //
          let from = "info@finefarming.co.kr";
          let subject = `${updateuser.username} 임시 비밀번호 메일입니다.`;
          let to = `${email}`;

          const mailData: any = {
            to: to,
            subject: subject,
            from: from,
            html: findPasswordTemlplate({
              username: updateuser.username!,
              tempassword: temppasswrd,
            }),
          };
          let sendResult = await sendMail(mailData);
          console.log("sendResult", sendResult);
          return { message: "ok" } as any;
        } else {
          //
          return {
            error: "문제가 발생했습니다. 관리자에게 문의하세요.",
          } as any;
        }
      } else {
        return { error: `${user.provider}로 회원 가입 하였습니다.` } as any;
      }
    } else {
      return { error: "가입한 이메일이 없습니다." } as any;
    }
    // 임시 비밀번호 세팅
  } else {
    return { error: "비밀번호가 없습니다." } as any;
  }
}
