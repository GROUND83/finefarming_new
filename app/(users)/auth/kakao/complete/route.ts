import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  if (!code) {
    return notFound();
  }

  const accessTokenParams = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT_ID!,
    client_secret: process.env.KAKAO_CLIENT_SECRET!,
    code: code,
  }).toString();
  const accessTokenURL = `https://kauth.kakao.com/oauth/token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, { status: 400 });
  }
  const userProfileReponse = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    cache: "no-cache",
  });
  const userdata = await userProfileReponse.json();
  console.log(userdata);
  const { id, kakao_account } = userdata;
  const {
    name,
    email,
    phone_number,
    profile: { thumbnail_image_url },
  } = kakao_account;
  console.log(id, name, email, thumbnail_image_url);

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      provider: true,
      role: true,
    },
  });
  if (user) {
    // 유저가 있으면 로그인
    if (user.provider !== "kakao") {
      //
      return redirect("/auth/error");
    }
    const sessoin = await getSession();
    sessoin.id = user.id;
    sessoin.role = user.role;
    await sessoin.save();
    return redirect("/profile");
  }
  const newUser = await db.user.create({
    data: {
      username: name,
      email: email,
      phone: phone_number,
      kakaoId: id.toString(),
      avatar: thumbnail_image_url,
      provider: "kakao",
      created_at: getDateTime(),
      updated_at: getDateTime(),
    },
  });
  const sessoin = await getSession();
  sessoin.id = newUser.id;
  await sessoin.save();
  return redirect("/profile");
  // //
  // // db 조회
  // // 이메일로 유저 있는지 조회 깃허브
  // // 있으면 로그인 => 홈으로
  // // 없으면 회원 가입 => 로그인 => 홈
  // // response": {
  // //     "id": "6Q989F2A9cj9mvecq-gaEclkRlgboHyLGYCgIBURYe8",
  // //     "profile_image": "https://phinf.pstatic.net/contact/20231228_64/1703731581212MmYH1_PNG/avatar_profile.png",
  // //     "email": "wonchang.k@gmail.com",
  // //     "name": "김원창"
  // //   }
  // return Response.json({ userdata });
}
