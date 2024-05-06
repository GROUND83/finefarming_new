// api router는 webHook을 위한것
// rest api라고 생각하면 된다.
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}

export async function POST(request: NextRequest) {
  // request.cookies.get("")
  const data = await request.json();
  console.log("user log in");
  return Response.json(data);
}
