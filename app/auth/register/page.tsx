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

import { useRouter } from "next/navigation";

import { formSchema } from "./registerSchema";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data: any) {
    console.log("data", data);

    let userData = {
      username: data.username,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/create`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("res", res, res.status);
    if (res.ok) {
      const result = await signIn("credentials", {
        email: data.email,

        role: "user",
        type: "email",
        password: data.password,
        redirect: false,
      });
      if (result?.ok) {
        router.replace("/");
      } else {
        toast({ variant: "destructive", title: result?.error?.toString() });
        form.reset();
      }
    } else {
      const data = await res.json();
      console.log(data.message);
      toast({ variant: "destructive", title: data.message });
    }
  }
  return (
    <main className="w-full lg:w-1/3 mx-auto grid grid-cols-2 gap-1 h-screen pb-24">
      <div className="flex flex-col items-center gap-6 col-span-2 p-6 justify-center">
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
            className="flex flex-col gap-3 w-full"
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
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="이름을 입력하세요."
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>전화번호</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="전화번호를 입력하세요."
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-3 w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="비밀번호를 입력하세요."
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>확인 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="확인 비밀번호를 입력하세요."
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">회원가입</Button>
          </form>
        </Form>
        <SocialLogin redirect="/" />
        <div className="flex flex-row items-center gap-3 ">
          <span>이미 계정이 있나요?</span>
          <Link href={"/auth/login"} className="text-primary font-bold">
            로그인
          </Link>
        </div>
        <p className="text-sm">회원가입</p>
        <div className="flex flex-row items-center gap-3 ">
          <Link
            href={"/othersAuth/farmer/register"}
            className="text-neutral-500 text-sm "
          >
            농장주
          </Link>
          <Link
            href={"/othersAuth/writer/register"}
            className="text-neutral-500 text-sm "
          >
            매거진 작가
          </Link>
          {/* <Link
            href={"/othersAuth/manager/register"}
            className="text-neutral-500 text-sm "
          >
            매니저
          </Link> */}
          {/* <Link
            href={"/othersAuth/superadmin/register"}
            className="text-neutral-500 text-sm "
          >
            슈퍼어드민
          </Link> */}
        </div>
      </div>
    </main>
  );
}
