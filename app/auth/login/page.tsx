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

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  let redirectStr = searchParams.get("redirect");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log("data", data);
    let result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      role: "user",
      type: "email",
      callbackUrl: redirectStr ? redirectStr : "/",
      redirect: false,
    });
    if (result?.ok) {
      console.log("redirectStr", redirectStr);
      if (redirectStr) {
        router.replace(redirectStr);
      } else {
        router.replace("/");
      }
    } else {
      toast({ variant: "destructive", title: result?.error?.toString() });
      form.reset();
    }
  }
  return (
    <main className="w-full lg:w-1/3 mx-auto grid grid-cols-2 gap-1 h-screen pb-24">
      <div className="flex flex-col items-center gap-6 col-span-2 p-6 justify-center w-full">
        <div className="flex flex-col items-center gap-3">
          <Link href={"/"} className=" relative w-[90px] h-[50px] ">
            <Image
              src="/logocolor.svg"
              alt="logo"
              fill
              sizes="100%"
              className=" object-cover"
              priority
            />
          </Link>
          <p>파인파밍에 어서오세요!</p>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-6 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이메일을 입력하세요."
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="비밀번호를 입력하세요."
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">로그인</Button>
          </form>
        </Form>

        <SocialLogin redirect={redirectStr ? redirectStr : ""} />
        <div className="flex flex-row items-center gap-3 ">
          <span>아직 계정이 없나요?</span>
          <Link href={"/auth/register"} className="text-primary font-bold">
            회원가입
          </Link>
        </div>
        <div className="flex flex-row items-center gap-3 ">
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
        </div>
      </div>
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
