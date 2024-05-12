"use client";

import SocialLogin from "@/components/social-login";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { formSchema } from "./loginSchema";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useToast } from "@/components/ui/use-toast";
import Logo from "../../../public/logocolor.svg";
import Copyright from "@/components/copyright";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";
import LogoWrap from "@/components/logowrap";
//
function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  let redirectStr = searchParams.get("redirect");

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  // async function onSubmit(data: z.infer<typeof formSchema>) {
  //   // console.log("data", data);
  //   let result = await signIn("credentials", {
  //     email: data.email,
  //     password: data.password,
  //     role: "user",
  //     type: "email",
  //     callbackUrl: redirectStr ? redirectStr : "/",
  //     redirect: false,
  //   });
  //   if (result?.ok) {
  //     console.log("redirectStr", redirectStr);
  //     if (redirectStr) {
  //       router.replace(redirectStr);
  //     } else {
  //       router.replace("/");
  //     }
  //   } else {
  //     toast({ variant: "destructive", title: result?.error?.toString() });
  //     form.reset();
  //   }
  // }
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
      {/* <section className=" w-full p-6 flex flex-col items-center gap-6">
        <span className="text-neutral-500 text-sm">또는</span>
        <SocialLogin redirect={redirectStr ? redirectStr : ""} />
      </section> */}
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
