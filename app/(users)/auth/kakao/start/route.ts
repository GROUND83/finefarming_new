import { redirect } from "next/navigation";
// "https://farm.ground83.info/auth/kakao/complete"
export function GET() {
  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const params = {
    response_type: "code",
    client_id: process.env.KAKAO_CLIENT_ID!,
    redirect_uri: encodeURI(`${process.env.SERVER_URL}/auth/kakao/complete`),
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
