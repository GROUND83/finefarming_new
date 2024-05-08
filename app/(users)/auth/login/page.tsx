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
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Login() {
  const searchParams = useSearchParams();

  let redirect = searchParams.get("redirect");
  // console.log(redirect);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log("data", data);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      type: "user",
      callbackUrl: redirect ? redirect : "/",
      redirect: true,
    });
    // console.log("result", result);
  }
  return (
    <main className=" w-full grid grid-cols-2 gap-1 h-screen">
      <div className="flex flex-col items-center gap-6 col-span-2 p-6 justify-center w-full">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logocolor.svg" alt="logo" width={90} height={100} />
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

        <SocialLogin redirect={redirect ? redirect : ""} />
        <div className="flex flex-row items-center gap-3 ">
          <span>아직 계정이 없나요?</span>
          <Link href={"/auth/register"} className="text-primary font-bold">
            회원가입
          </Link>
        </div>
        <div className="flex flex-row items-center gap-3 ">
          <Link href={"/farmerAuth"} className="text-neutral-500 text-sm ">
            농장주
          </Link>
          <Link href={"/writerAuth"} className="text-neutral-500 text-sm ">
            매거진 작가
          </Link>
          <Link href={"/mangerAuth"} className="text-neutral-500 text-sm ">
            매니저
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
