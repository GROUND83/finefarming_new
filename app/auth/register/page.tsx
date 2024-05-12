"use client";
import SocialLogin from "@/components/social-login";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { formSchema } from "./registerSchema";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Loader2 } from "lucide-react";
import LogoWrap from "@/components/logowrap";
import PersonalPolicyWrap from "@/components/persnalPolicyWrap";
import ServicePolicy from "@/components/servicePolicyWrap";
import PersonalInfo from "@/components/personalInfo";

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      phone: "",
      password: "",

      servicePolicy: false,
      personlaPolicy: false,
      overForteen: false,
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data", data);

    let userData = {
      username: data.username,
      phone: data.phone,
      email: data.email,
      password: data.password,
      servicePolicy: data.servicePolicy,
      personlaPolicy: data.personlaPolicy,
      overForteen: data.overForteen,
    };
    try {
      setLoading(true);
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
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log(value, name, type);
      if (name === "whole") {
        if (form.getValues("whole")) {
          form.setValue("servicePolicy", true);
          form.setValue("personlaPolicy", true);
          form.setValue("overForteen", true);
        } else {
          form.setValue("servicePolicy", false);
          form.setValue("personlaPolicy", false);
          form.setValue("overForteen", false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);
  return (
    <main className="w-full lg:w-1/2 mx-auto grid grid-cols-2 gap-1 min-h-screen">
      <div className="flex flex-col items-center gap-6 col-span-2 p-6 justify-center">
        <div className="flex flex-col items-center gap-3">
          <LogoWrap />
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
              {/* <FormField
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
              /> */}
            </div>
            <div className="mt-6">
              <div className="py-3 border-b">
                <FormField
                  control={form.control}
                  name="whole"
                  render={({ field }) => (
                    <FormItem className="w-full  flex flex-row items-center   space-y-0 gap-2">
                      <FormControl>
                        <Checkbox
                          className="size-5 rounded-none "
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className=" ">사용자 약관 전체 동의</FormLabel>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <div className="flex flex-row items-center ">
                    <FormField
                      control={form.control}
                      name="servicePolicy"
                      render={({ field }) => (
                        <FormItem className="w-full  flex flex-row items-center   space-y-0 gap-2">
                          <FormControl>
                            <Checkbox
                              className="size-5 rounded-none "
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className=" ">
                            서비스 이용 약관 동의(필수)
                          </FormLabel>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AccordionTrigger className=" w-[100px] flex flex-col  "></AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <ScrollArea className="h-[400px] bg-neutral-100">
                      <div className="p-3">
                        <ServicePolicy />
                      </div>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <div className="flex flex-row items-center ">
                    <FormField
                      control={form.control}
                      name="personlaPolicy"
                      render={({ field }) => (
                        <FormItem className="w-full  flex flex-row items-center   space-y-0 gap-2">
                          <FormControl>
                            <Checkbox
                              className="size-5 rounded-none "
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className=" ">
                            개인정보 수집 및 이용동의(필수)
                          </FormLabel>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AccordionTrigger className=" w-[100px] flex flex-col  "></AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <ScrollArea className="h-[400px] bg-neutral-100">
                      <div className="p-3">
                        <PersonalInfo />
                      </div>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <div className="flex flex-row items-center w-full justify-between ">
                    <FormField
                      control={form.control}
                      name="overForteen"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center   space-y-0 gap-2 flex-1">
                          <FormControl>
                            <Checkbox
                              className="size-5 rounded-none "
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className=" ">
                            만 14세 이상 확인(필수)
                          </FormLabel>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AccordionTrigger className=" w-[100px] flex flex-col  "></AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <div className="p-3">
                      <p>
                        정보통신망 이용촉진 및 정보보호 등에 관한 법률에 따라 만
                        14세 미만 아동의 개인정보 수집 시 법정대리인의 동의를
                        받도록 규정하고 있습니다. <br />만 14세 미만 아동이
                        법정대리인 동의 없이 회원가입을 할 경우 회원탈퇴 또는
                        서비스 이용에 제한이 있을 수 있습니다.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "회원가입"
              )}
            </Button>
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
        </div>
      </div>
    </main>
  );
}
