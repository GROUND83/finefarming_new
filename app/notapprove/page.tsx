"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col items-center">
        <p>미승인 상태입니다.</p>
        <p>관리자에게 문의하세요.</p>
        <p className="text-sm text-neutral-500">newfarmingplatform@gmail.com</p>
      </div>
      <Button asChild>
        <Link href={"/"}>홈으로</Link>
      </Button>
      <Button onClick={() => signOut()} variant={"outline"}>
        로그아웃
      </Button>
    </div>
  );
}
