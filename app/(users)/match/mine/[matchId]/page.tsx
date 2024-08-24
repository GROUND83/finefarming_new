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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  deleteMathch,
  getMatchDetail,
  updateMatch,
} from "@/app/admin/matching/[matchId]/_component/actions";
import { DeleteButton } from "@/components/ButtonComponent";

//
const FormSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  region: z.string(),
  number: z.string(),
  preference: z.string(),
  spent: z.string(),

  dob: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: "필수 선택입니다." }
    )
    .refine((date) => {
      return !!date.to;
    }, "체험일정을 선택하세요."),
  lastDate: z.date(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().optional(),
    phone: z.string(),
  }),
  authorName: z.string(),
  authorPhone: z.string(),
  authorEmail: z.string(),
});
export default function Page({ params }: { params: { matchId: string } }) {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [detail, setDetail] = React.useState<any>();
  const router = useRouter();
  const session = useSession();
  // const userAgent = headers().get("user-agent") || "";
  // const mobileCheck = isMobile(userAgent);
  // console.log("session", session);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      region: "",
      number: "",
      preference: "",
      spent: "",

      dob: { from: undefined, to: undefined },
      lastDate: undefined,
      user: {
        id: undefined,
        username: "",
        email: "",
        phone: "",
      },
    },
  });

  const getDeatailData = async () => {
    //
    let res = await getMatchDetail(params.matchId);
    if (res) {
      console.log("getMatchDetail", res);
      form.reset({
        id: res.id,
        title: res.title || "",
        description: res.description || "",
        region: res.region || "",
        number: res.number?.toString() || "",
        preference: res.preference || "",
        spent: res.spent || "",
        dob: {
          from: res.startDate ? dayjs(res.startDate).toDate() : new Date(),
          to: res.endDate ? dayjs(res.endDate).toDate() : new Date(),
        },
        lastDate: res.lastDate ? dayjs(res.lastDate).toDate() : new Date(),
        user: {
          id: res.id || undefined,
          username: res.user.username || "",
          email: res.user.email || "",
          phone: res.user.phone || "",
        },
        authorEmail: res.authorEmail || "",
        authorName: res.authorName || "",
        authorPhone: res.authorPhone || "",
      });
      setDetail(res);
    }
  };
  React.useEffect(() => {
    getDeatailData();
  }, [params]);
  // React.useEffect(() => {
  //   if (session.status === "authenticated") {
  //     console.log("session", session);
  //     if (session.data?.user.role !== "user") {
  //       router.push("/permition");
  //     } else {
  //       form.reset({
  //         user: {
  //           id: session.data.user.id,
  //           username: session.data.user?.username || "",
  //           email: session.data.user?.email || "",
  //           phone: session.data.user?.phone || "",
  //         },
  //         authorName: session.data.user?.username || "",
  //         authorPhone: session.data.user?.phone || "",
  //         authorEmail: session.data.user?.email || "",
  //       });
  //     }
  //   }
  // }, [session]);

  React.useEffect(() => {
    if (form.formState) {
      console.log(form.formState);
    }
  }, [form.formState]);
  // const onError = (errors, e) => console.log(errors, e);
  async function onSubmit(data: any) {
    console.log("Data", data);
    setLoading(true);
    try {
      let newData = JSON.stringify({
        id: data.id,
        title: data.title,
        description: data.description,
        region: data.region,
        number: data.number,
        preference: data.preference,
        spent: data.spent,
        dob: {
          from: dayjs(data.dob.from).format("YYYY-MM-DD"),
          to: dayjs(data.dob.to).format("YYYY-MM-DD"),
        },
        lastDate: dayjs(data.lastDate).format("YYYY-MM-DD"),
        user: {
          id: data.user.id,
        },
        authorEmail: data.authorEmail || "",
        authorName: data.authorName || "",
        authorPhone: data.authorPhone || "",
      });
      let result = await updateMatch(newData);
      console.log("result", result);
      if (result.data) {
        //
        toast.success("체험메칭 글쓰기 수정에 성공하였습니다.");
        router.push("/match/mine");
      } else {
      }
    } catch (e) {
      // toast.error(e);
    } finally {
      setLoading(false);

      // window.location.reload();
    }
  }

  const deleteItem = async () => {
    //
    setDeleteLoading(true);
    try {
      let res = await deleteMathch(params.matchId);
      if (res) {
        toast.success("삭제 완료 되었습니다.");
        router.push(`/match/mine`);
      }
    } catch (e: any) {
      toast.error(e);
    }
    setDeleteLoading(false);
  };
  return (
    <div className="  ">
      <div className="container mx-auto  p-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full p-6 flex flex-col gap-6 items-start "
          >
            <div className="w-full flex flex-col gap-6">
              <h3 className="mb-4 text-lg font-medium">체험매칭 글쓰기</h3>
              <div className="w-full flex flex-col items-start gap-3">
                <div className=" w-full grid grid-cols-12 gap-3 border p-6 rounded-md">
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem className="flex flex-col  col-span-12 md:col-span-12  lg:col-span-4">
                        <FormLabel>희망지역</FormLabel>

                        <FormControl>
                          <Input
                            required
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem className="flex flex-col  col-span-12 md:col-span-12 lg:col-span-4">
                        <FormLabel>희망인원</FormLabel>

                        <FormControl>
                          <Input
                            required
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preference"
                    render={({ field }) => (
                      <FormItem className="flex flex-col  col-span-12 md:col-span-12 lg:col-span-4">
                        <FormLabel>선호하는 체험종류</FormLabel>

                        <FormControl>
                          <Input
                            required
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" w-full grid grid-cols-12 gap-3 border p-6 rounded-md">
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col  col-span-12 md:col-span-12 lg:col-span-4">
                        <FormLabel>체험일정</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  <span>
                                    {dayjs(field.value.from).format(
                                      "YYYY-MM-DD"
                                    )}{" "}
                                    ~{" "}
                                    {dayjs(field.value.to).format("YYYY-MM-DD")}
                                  </span>
                                ) : (
                                  <span>체험일정을 선택하세요.</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              locale={ko}
                              mode="range"
                              numberOfMonths={2}
                              defaultMonth={field.value.from}
                              selected={{
                                from: field.value.from!,
                                to: field.value.to,
                              }}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          체험일정을 선택하세요.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="spent"
                    render={({ field }) => (
                      <FormItem className="flex flex-col  col-span-12 md:col-span-12 lg:col-span-4">
                        <FormLabel>소요예산</FormLabel>
                        <FormControl>
                          <Input
                            required
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="소요예산을 입력하세요."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col  col-span-12 md:col-span-12 lg:col-span-4">
                        <FormLabel>제안 마감기한</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  <span>
                                    {dayjs(field.value).format("YYYY-MM-DD")}
                                  </span>
                                ) : (
                                  <span>마감기한을 선택하세요.</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              locale={ko}
                              mode="single"
                              numberOfMonths={2}
                              defaultMonth={field.value}
                              selected={field.value!}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          마감기한을 입력하세요.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" w-full grid grid-cols-12 gap-3 border p-6 rounded-md">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-between  col-span-12 ">
                        <FormLabel className="">제목</FormLabel>

                        <FormControl>
                          <Input
                            required
                            value={field.value || ""}
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
                      <FormItem className="flex flex-col items-startjustify-between col-span-12 ">
                        <FormLabel className="">내용</FormLabel>

                        <FormControl>
                          <Textarea
                            required
                            rows={10}
                            className=" resize-none"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" w-full grid grid-cols-12 gap-3 border p-6 rounded-md">
                  <FormField
                    control={form.control}
                    name="authorName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-between   col-span-12 md:col-span-12 lg:col-span-4">
                        <FormLabel className="">의뢰자 이름</FormLabel>

                        <FormControl>
                          <Input
                            required
                            className=" resize-none"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="authorEmail"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-between  col-span-12 md:col-span-12 lg:col-span-4">
                        <FormLabel className="">의뢰자 이메일</FormLabel>

                        <FormControl>
                          <Input
                            required
                            className=" resize-none"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="authorPhone"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-between  col-span-12 md:col-span-12 lg:col-span-4">
                        <FormLabel className="">의뢰자 전호번호</FormLabel>

                        <FormControl>
                          <Input
                            required
                            className="resize-none"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-6 w-full">
              <DeleteButton
                title="매칭 게시글 삭제"
                description="메칭 게시글을 삭제합니다."
                deleteLoading={deleteLoading}
                onDelete={deleteItem}
              />
              <Button type="submit">
                {loading ? <Loader2 className="size-4 animate-spin" /> : "수정"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
