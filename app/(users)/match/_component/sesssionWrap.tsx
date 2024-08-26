"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SessionWrap() {
  let session = useSession();
  return (
    <div className="flex flex-row items-center gap-3">
      {session?.data?.user?.role === "user" ? (
        <div>
          <Button asChild>
            <Link href={"/match/new"}>글쓰기</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col  items-start gap-3">
          <p className="text-sm">
            회원전용 게시판입니다. 회원가입 후 이용하세요.
          </p>
          <Button asChild>
            <Link href={"/auth/register"}>회원가입</Link>
          </Button>
        </div>
      )}
      {session?.data?.user?.role === "user" && (
        <Button variant={"backdelete"} asChild>
          <Link href={"/match/mine"}>내가 쓴글</Link>
        </Button>
      )}
    </div>
  );
}
