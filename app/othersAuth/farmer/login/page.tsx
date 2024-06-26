"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { login } from "../../_components/actions";
import { LoginSchema } from "../../_components/loginSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../../../public/logocolor.svg";
import LogoWrap from "@/components/logowrap";
export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      role: "farmer",
      type: "email",
      callbackUrl: "/dashfarmer/farm",
      redirect: false,
    });
    if (result?.ok) {
      router.push("/dashfarmer/farm");
    } else {
      toast.error(result?.error?.toString());
      form.reset();
    }
  }

  return (
    <div className="bg-white  w-full min-h-screen flex flex-col items-center justify-center p-6">
      <div className=" w-full lg:w-1/2 bg-white border rounded-md p-12 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3 relative">
          <LogoWrap />
          <p>파인파밍에 어서오세요!</p>
        </div>
        <p className=" font-semibold">농장주 로그인</p>
        <div className="w-full mx-auto ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일을 입력하세요."
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
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-col items-end">
                <Button type="submit">로그인</Button>
              </div>
            </form>
          </Form>
        </div>
        <div>
          <Link href="/othersAuth/farmer/findpassword" className="text-sm">
            비밀번호 찾기
          </Link>
        </div>
        <p className="text-sm text-neutral-500">{`© ${new Date().getFullYear()}. FineFarming All rights reserved.`}</p>
      </div>
    </div>
  );
}
