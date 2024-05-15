"use client";
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
import { signIn } from "next-auth/react";
import { formSchema } from "../loginSchema";

import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Logo from "../../../../public/logocolor.svg";
import React from "react";
import { Loader2 } from "lucide-react";
import LogoWrap from "@/components/logowrap";
import { LockClosedIcon } from "@heroicons/react/24/outline";
//
export default function Page() {
  const [loading, setLoading] = React.useState(false);
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
    try {
      setLoading(true);
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
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="w-full lg:w-1/3 mx-auto gap-1  pb-24 flex flex-col items-center justify-center  p-6 h-full">
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
          <Button type="submit" className="mt-6" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : "로그인"}
          </Button>
        </form>
      </Form>
      <section className="flex flex-row items-center gap-3  px-6  mt-24 h-6">
        <Link
          href={"/auth/findpassword"}
          className=" flex flex-row items-center gap-2 text-base"
        >
          <LockClosedIcon className="size-4" />
          비밀번호 찾기
        </Link>
      </section>
      <Link href={"/auth/register"} className="text-base mt-6">
        신규 회원 가입
      </Link>
    </main>
  );
}
