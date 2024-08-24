import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextURL } from "next/dist/server/web/next-url";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse, URLPattern } from "next/server";

// interface Routes {
//   [key: string]: boolean;
// }
// const publicOnlyUrls: Routes = {
//   "/": true,
//   "/auth/login": true,
//   "/auth/naver/start": true,
//   "/auth/naver/complete": true,
//   "/auth/kakao/start": true,
//   "/auth/kakao/complete": true,
//   "/login": true,
//   "/sms": true,
//   "/register": true,
//   "/github/start": true,
//   "/github/complete": true,
//   "/auth/error": true,
// };
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // console.log("pathname", pathname);
  const session = await getToken({ req, secret, raw: false });
  //
  if (pathname.startsWith("/auth/login")) {
    if (session) {
      console.log("session writer", session, session.role, session.id);
      if (session) {
        console.log("check");
        return NextResponse.redirect(new URL("/", req.url));
        //
      } else {
        // console.log("session", session);
        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  }
  //
  if (pathname.startsWith("/othersAuth")) {
    if (session) {
      console.log("session writer", session, session.role, session.id);
      if (session) {
        console.log("check");
        return NextResponse.redirect(new URL("/", req.url));
        //
      } else {
        // console.log("session", session);
        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  }
  if (pathname.startsWith("/profile")) {
    console.log("session", session);
    if (session?.role === "user") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  if (pathname.startsWith("/admin")) {
    console.log("session", session);
    if (session) {
      if (session.id && session.role) {
        if (session.role === "manager") {
          console.log("session", session);
          return NextResponse.next();
        } else if (session.role === "superAdmin") {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(
            new URL("/othersAuth/manager/login", req.url)
          );
        }
        //
      } else {
        // console.log("session", session);
        return NextResponse.redirect(
          new URL("/othersAuth/manager/login", req.url)
        );
      }
    } else {
      return NextResponse.redirect(
        new URL("/othersAuth/manager/login", req.url)
      );
    }
  }
  if (pathname.startsWith("/dashwriter")) {
    if (session) {
      console.log("session writer", session, session.role, session.id);
      if (session.id && session.role) {
        console.log("check");
        if (session.role === "writer") {
          console.log("check");
          return NextResponse.next();
        } else {
          return NextResponse.redirect(
            new URL("/othersAuth/writer/login", req.url)
          );
        }
        //
      } else {
        // console.log("session", session);
        return NextResponse.redirect(
          new URL("/othersAuth/writer/login", req.url)
        );
      }
    } else {
      return NextResponse.redirect(
        new URL("/othersAuth/writer/login", req.url)
      );
    }
  }
  if (pathname.startsWith("/dashfarmer")) {
    if (session) {
      console.log(
        "session writer",
        session,
        session.approve,
        session.role,
        session.id
      );
      if (session.id && session.role) {
        console.log("check");
        if (session.role === "farmer") {
          if (session.approve) {
            console.log("check");
            return NextResponse.next();
          } else {
            return NextResponse.redirect(new URL("/notapprove", req.url));
          }
        } else {
          return NextResponse.redirect(
            new URL("/othersAuth/farmer/login", req.url)
          );
        }
        //
      } else {
        // console.log("session", session);
        return NextResponse.redirect(
          new URL("/othersAuth/farmer/login", req.url)
        );
      }
    } else {
      return NextResponse.redirect(
        new URL("/othersAuth/farmer/login", req.url)
      );
    }
  }
  if (pathname.startsWith("/match")) {
    if (session) {
      console.log(
        "session writer",
        session,
        session.approve,
        session.role,
        session.id
      );
      if (session.id && session.role) {
        console.log("check");
        if (session.role === "farmer") {
          if (session.approve) {
            console.log("check");
            return NextResponse.next();
          } else {
            return NextResponse.redirect(new URL("/notapprove", req.url));
          }
        } else {
          return NextResponse.next();
        }
        //
      } else {
        // console.log("session", session);
        return NextResponse.redirect(new URL("/notlogin", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/notlogin", req.url));
    }
  }
  // if (pathname.startsWith("/match")) {
  //   // console.log("session", session);
  //   if (req.url) {
  //     let splitUrl = req.url.split("/match/");
  //     console.log("splitUrl", splitUrl);
  //     if (splitUrl[1]) {
  //       //
  //       console.log("splitUrl", splitUrl);
  //       if (session) {
  //         if (session.id && session.role) {
  //           if (session.role === "user" || session.role === "manager") {
  //             console.log("session", session);
  //             return NextResponse.next();
  //           } else if (session.role === "superAdmin") {
  //             return NextResponse.next();
  //           } else {
  //             return NextResponse.redirect(new URL("/", req.url));
  //           }
  //           //
  //         } else {
  //           // console.log("session", session);
  //           return NextResponse.redirect(
  //             new URL("/othersAuth/manager/login", req.url)
  //           );
  //         }
  //       } else {
  //         return NextResponse.redirect(
  //           new URL("/othersAuth/manager/login", req.url)
  //         );
  //       }
  //     } else {
  //       //
  //     }
  //   }
  // }
  // if (pathname.startsWith("/reservation/new")) {
  //   if (session) {
  //     console.log("session writer", session, session.role, session.id);
  //     if (session.id && session.role) {
  //       console.log("check");
  //       if (session.role === "customer") {
  //         console.log("check");
  //         return NextResponse.next();
  //       } else {
  //         return NextResponse.redirect(new URL("/auth/login", req.url));
  //       }
  //       //
  //     } else {
  //       // console.log("session", session);
  //       return NextResponse.redirect(new URL("/auth/login", req.url));
  //     }
  //   } else {
  //     return NextResponse.redirect(new URL("/auth/login", req.url));
  //   }
  // }
  // return NextResponse.next();
}

export const config = {
  //   matcher: ["/", "/profile", "auth/:path*"], // 미들웨어 실행할 path
  matcher: [
    "/match/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.svg$).*)", //제외
  ], // 미들웨어 실행할 path
};
