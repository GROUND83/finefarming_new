"use client";
import SocialLogin from "@/components/social-login";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGHT,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
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
const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

export default function Page() {
  const { toast } = useToast();

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
    const res = await fetch("http://localhost:3000/api/writer/create", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res", res, res.status);
    if (res.ok) {
      if (res.status == 200) {
        const result = await signIn("credentials", {
          email: data.email,
          type: "writer",
          password: data.password,
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          redirect: true,
        });
      } else {
        const data = await res.json();
        console.log(data.message);
      }
    } else {
      const data = await res.json();
      console.log(data.message);
      toast({ variant: "destructive", title: data.message });
    }
  }
  return (
    <main className=" container mx-auto grid grid-cols-2 gap-1 h-screen pb-24">
      <div className="flex flex-col items-center gap-6 col-span-2 p-6 justify-center">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logocolor.svg" alt="logo" width={90} height={100} />
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
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="확인 비밀번호를 입력하세요."
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
      </div>
    </main>
  );
}
