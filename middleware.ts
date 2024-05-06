import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

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

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("pathname", pathname);
  const session = await getSession();
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
          return NextResponse.redirect(new URL("/mangerAuth", request.url));
        }
        //
      } else {
        console.log("session", session);
        return NextResponse.redirect(new URL("/mangerAuth", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/mangerAuth", request.url));
    }
  } else if (pathname.startsWith("/dashbordWriter")) {
    if (session) {
      // console.log("session", session);
      if (session.id && session.role) {
        if (session.role === "writer") {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/writerAuth", request.url));
        }
        //
      } else {
        // console.log("session", session);
        return NextResponse.redirect(new URL("/writerAuth", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/writerAuth", request.url));
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
    "/admin/:path*",
    "/writer/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$).*)", //제외
  ], // 미들웨어 실행할 path
};
