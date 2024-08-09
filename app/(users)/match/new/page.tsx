"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Loader2, XIcon } from "lucide-react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
// import { createCommunity } from "./_component//actions";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { isMobile } from "@/lib/isMobile";
import { notFound, redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createMatching } from "../_component/actions";
import { toast } from "sonner";
const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
  }),
});
export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();
  // const userAgent = headers().get("user-agent") || "";
  // const mobileCheck = isMobile(userAgent);
  console.log("session", session);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  // if (session?.user.role !== "user") {
  //   // redirect("/");
  //   notFound();
  // }
  React.useEffect(() => {
    if (session.status === "authenticated") {
      console.log("session", session);
      if (session.data?.user.role !== "user") {
        router.push("/match/permition");
      } else {
        form.reset({
          user: {
            id: session.data.user.id,
            username: session.data.user?.username || "",
            email: session.data.user?.email || "",
          },
        });
      }
    }
  }, [session]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data", data);
    setLoading(true);
    try {
      if (session?.data?.user.username) {
        let newData = JSON.stringify({
          ...data,
          // authorName: session?.data?.user.username,
          // autherId: session?.data?.user.id,
          // authorType: "user",
        });
        let result = await createMatching(newData);
        console.log("result", result);
        if (result.data) {
          //
          toast.success("체험메칭 글쓰기에 성공하였습니다.");
          router.push("/match");
        }
      } else {
      }
    } catch (e) {
      // toast.error(e);
    } finally {
      setLoading(false);

      // window.location.reload();
    }
  }
  return (
    <div className="  ">
      <div className="container mx-auto  p-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 p-6 "
          >
            <div>
              <h3 className="mb-4 text-lg font-medium">체험매칭 글쓰기</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start justify-between  ">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">제목</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          required
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-startjustify-between ">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">내용</FormLabel>
                      </div>
                      <FormControl>
                        <Textarea
                          required
                          rows={10}
                          className=" resize-none"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user.username"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-startjustify-between ">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">의뢰자 이름</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          required
                          className=" resize-none"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user.email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-startjustify-between ">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          의뢰자 이메일
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          required
                          className=" resize-none"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">
              {loading ? <Loader2 className="size-4 animate-spin" /> : "생성"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
