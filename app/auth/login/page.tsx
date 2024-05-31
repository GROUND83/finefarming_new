"use client";

import SocialLogin from "@/components/social-login";

import Link from "next/link";

import { Suspense } from "react";

import Copyright from "@/components/copyright";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";
import LogoWrap from "@/components/logowrap";
//
function Login() {
  return (
    <main className="w-full lg:w-1/3 mx-auto gap-1  pb-24 flex flex-col items-center justify-center h-full ">
      <section className="flex flex-col items-center gap-6  p-6 justify-center w-full">
        <header className="flex flex-col items-center w-full gap-2">
          <LogoWrap />
          <p className="text-xl  text-pretty text-primary whitespace-pre-line text-center font-roboto">
            {`FineFarming,\n Best Farms for you`}
          </p>

          <h1 className=" whitespace-pre-line font-roboto tracking-[10px]  font-bold text-lg mt-6">
            LOGIN
          </h1>
          <span className="text-neutral-500">로그인</span>
        </header>
      </section>
      <section className="flex flex-row items-center gap-3  px-6  mt-24 h-6">
        <Link
          href={"/auth/login/email"}
          className=" flex flex-row items-center gap-2 text-base"
        >
          <EnvelopeIcon className="size-4" />
          이메일 로그인
        </Link>
        <Separator orientation="vertical" className="bg-neutral-600" />
        <Link href={"/auth/register"} className="text-base">
          신규 회원 가입
        </Link>
      </section>

      <section className=" w-full p-6 flex flex-col items-center gap-6">
        <span className="text-neutral-500 text-sm">또는</span>
        <SocialLogin redirect={"/"} />
      </section>
      <section className="flex flex-row items-center gap-3 px-6 mt-16">
        <Link
          href={"/othersAuth/farmer/login"}
          className="text-neutral-500 text-sm "
        >
          농장주
        </Link>
        <Link
          href={"/othersAuth/writer/login"}
          className="text-neutral-500 text-sm "
        >
          매거진 작가
        </Link>
        <Link
          href={"/othersAuth/manager/login"}
          className="text-neutral-500 text-sm "
        >
          매니저
        </Link>
        <Link
          href={"/othersAuth/superadmin/login"}
          className="text-neutral-500 text-sm "
        >
          관리자
        </Link>
      </section>
      <footer className=" col-span-1  mt-3">
        <Copyright />
      </footer>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
