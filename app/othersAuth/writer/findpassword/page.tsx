"use client";
import LogoWrap from "@/components/logowrap";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { findPasswordSchema } from "./findPasswordSchema";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import findPassword from "./actions";
import { toast } from "@/components/ui/use-toast";

//
export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof findPasswordSchema>>({
    resolver: zodResolver(findPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(data: z.infer<typeof findPasswordSchema>) {
    // console.log("data", data);
    try {
      setLoading(true);

      let { error, message } = await findPassword(data.email);
      console.log(error);
      if (error) {
        form.reset();
        return toast({
          variant: "destructive",
          title: error,
        });
      }

      if (message) {
        router.push("/othersAuth/writer/login");
      }
    } catch (e) {
      console.log(e);
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
            비밀번호 찾기
          </h1>
          <span className="text-neutral-500"> 비밀번호 찾기</span>
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
          <div className="w-full flex flex-col items-center">
            <p className="text-neutral-500 text-sm">
              임시비밀번호를 가입한 이메일로 발송합니다.
            </p>
          </div>
          <Button type="submit" className="mt-3" disabled={loading}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "메일 전송"
            )}
          </Button>
        </form>
      </Form>
    </main>
  );
}
