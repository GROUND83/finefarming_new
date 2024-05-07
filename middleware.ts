import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Routes {
  [key: string]: boolean;
}
const publicOnlyUrls: Routes = {
  "/": true,
  "/auth/login": true,
  "/auth/naver/start": true,
  "/auth/naver/complete": true,
  "/auth/kakao/start": true,
  "/auth/kakao/complete": true,
  "/login": true,
  "/sms": true,
  "/register": true,
  "/github/start": true,
  "/github/complete": true,
  "/auth/error": true,
};
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log("pathname", pathname);
  const session = await getToken({ req, secret, raw: false });
  // console.log("session", session);
  // const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (pathname.startsWith("/admin")) {
    if (session) {
      if (session.id && session.role) {
        if (session.role === "manager") {
          console.log("session", session);
          return NextResponse.next();
        } else if (session.role === "superAdmin") {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/mangerAuth", req.url));
        }
        //
      } else {
        // console.log("session", session);
        return NextResponse.redirect(new URL("/mangerAuth", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/mangerAuth", req.url));
    }
  }
  if (pathname.startsWith("/dashbordWriter")) {
    if (session) {
      console.log("session writer", session, session.role, session.id);
      if (session.id && session.role) {
        console.log("check");
        if (session.role === "writer") {
          console.log("check");
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/", req.url));
        }
        //
      } else {
        // console.log("session", session);
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // if (!session.id) {
  //   //   유저가 없으면 퍼블릭 URL로 이동 못한다.
  //   if (!exists) {
  //     // 퍼블릭 URL이 아니면 다이렉트
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // } else {
  //   //유저가 로그안 하면
  //   if (exists) {
  //     // 퍼블릭 접근하면
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
  // //   console.log(session);
  //   if (pathname === "/") {
  //     //
  //     const response = NextResponse.next();
  //     response.cookies.set("middle-finefarming", "hello");
  //     return response;
  //   }
  //   if (pathname === "/profile") {
  //     //   Response.redirect(new URL("/",request.url))
  //     return Response.json({
  //       error: "you are not allowed here!",
  //     });
  //   }
  //
}

export const config = {
  //   matcher: ["/", "/profile", "auth/:path*"], // 미들웨어 실행할 path
  matcher: [
    "/dashbordWriter/:path*",
    "/admin/:path*",
    "/writer/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.svg$).*)", //제외
  ], // 미들웨어 실행할 path
};
