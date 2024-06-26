"use client";
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
import { toast } from "sonner";
import Image from "next/image";
import { LoginSchema } from "../../_components/loginSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogoWrap from "@/components/logowrap";
import React from "react";
import { Loader2 } from "lucide-react";
import LoadingSumnitButton from "@/components/loadingSubmit";
import Link from "next/link";

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        role: "writer",
        type: "email",
        callbackUrl: "/dashwriter/magazine",
        redirect: false,
      });
      if (result?.ok) {
        router.replace("/dashwriter/magazine");
      } else {
        console.log("result", result);
        toast.error(result?.error?.toString());
        form.reset();
        setLoading(false);
      }
    } catch (e) {
      //
      console.log("e", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white  w-full min-h-screen flex flex-col items-center justify-center p-6">
      <div className=" w-full lg:w-1/2 bg-white border rounded-md p-12 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3 relative">
          <LogoWrap />
          <p>파인파밍에 어서오세요!</p>
        </div>
        <p className=" font-semibold">매거진 작가 로그인</p>
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
                <LoadingSumnitButton loading={loading} />
              </div>
            </form>
          </Form>
        </div>
        <div>
          <Link href="/othersAuth/writer/findpassword" className="text-sm">
            비밀번호 찾기
          </Link>
        </div>
        <p className="text-sm text-neutral-500">{`© ${new Date().getFullYear()}. FineFarming All rights reserved.`}</p>
      </div>
    </div>
  );
}
