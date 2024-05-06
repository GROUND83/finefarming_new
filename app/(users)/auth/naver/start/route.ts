import { redirect } from "next/navigation";

export function GET() {
  const baseURL = "https://nid.naver.com/oauth2.0/authorize";
  const params = {
    response_type: "code",
    client_id: process.env.NAVER_CLIENT_ID!,
    redirect_uri: encodeURI(`${process.env.SERVER_URL}/auth/naver/complete`),
    state: "RAMDOM_STATE",
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
