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
    client_id: process.env.NAVER_CLIENT_ID!,
    client_secret: process.env.NAVER_CLIENT_SECRET!,
    code: code,
    state: state!,
  }).toString();
  const accessTokenURL = `https://nid.naver.com/oauth2.0/token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, { status: 400 });
  }
  const userProfileReponse = await fetch(
    "https://openapi.naver.com/v1/nid/me",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    }
  );
  const { resultcode, message, response } = await userProfileReponse.json();

  const { id, profile_image, email, name, mobile } = response;
  console.log(id, profile_image, email, name, mobile);
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
    // console.log("user", user);
    if (user.provider !== "naver") {
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
      naverId: id,
      phone: mobile,
      avatar: profile_image,
      provider: "naver",
      created_at: getDateTime(),
      updated_at: getDateTime(),
    },
  });
  const sessoin = await getSession();
  sessoin.id = newUser.id;
  await sessoin.save();
  return redirect("/profile");
}
