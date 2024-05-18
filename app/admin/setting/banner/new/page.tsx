"use client";
import React from "react";
import {
  ExclamationCircleIcon,
  PhotoIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import { Loader2, MinusIcon } from "lucide-react";
import Link from "next/link";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  DeleteButton,
  LoadingEditSubmitButton,
} from "@/components/ButtonComponent";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getUploadUrl } from "@/lib/uploadUrl";

import Image from "next/image";
import { toast } from "sonner";
import { bannerShema, bannerShemaType } from "../farmItemSchema";
import {
  deleteBanner,
  editFarmItems,
  getBanner,
  newBanner,
} from "../table/actions";
import { FormTitle } from "@/app/admin/_component/form/form";
import { useRouter } from "next/navigation";
import { newBannerShema, newBannerShemaType } from "./newBannerSchema";

export default function Page() {
  const [updateloading, setUpdateLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<newBannerShemaType>({
    resolver: zodResolver(newBannerShema),
    defaultValues: {},
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log("data", data);
    setUpdateLoading(true);

    try {
      let newStringFy = JSON.stringify(data);
      let result = await newBanner(newStringFy);
      toast.success("배너생성에 성공하였습니다.");
      // toast({
      //   duration: 3000,
      //   title: "수정완료",
      //   description: "데이터 수정이 완료 되었습니다.",
      // });
    } catch (e: any) {
      //
      toast.error(e);
    } finally {
      // reload();
      setUpdateLoading(false);
      router.refresh();
      router.push("/admin/setting/banner");
    }
  });
  //

  //
  const onMainImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target, event.target.name);
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    console.log(file);
    if (file.size > 2000000) {
      alert("이미지 사이즈가 2mb를 초과 하였습니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    console.log(url);

    const { success, result } = await getUploadUrl();
    console.log(result);
    if (success) {
      const { id, uploadURL } = result;
      const bannerImage = new FormData();
      bannerImage.append("file", file);
      // 시잔 업로드
      const response = await fetch(uploadURL, {
        method: "POST",
        body: bannerImage,
      });
      if (response.status !== 200) {
        return;
      }
      let name: any = event.target.name.toString();
      if (event.target.name) {
        form.setValue(
          "image",
          `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}/public`,
          { shouldDirty: true }
        );
      }
    }
  };

  return (
    <div className="w-full h-screen p-3">
      <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
        <Form {...form}>
          <form
            className="w-full flex flex-col items-start gap-6 text-sm "
            onSubmit={onSubmit}
          >
            <div className=" grid grid-cols-12 gap-3 w-full flex-1 border-b pb-12">
              <div className="col-span-12 grid grid-cols-12 gap-3">
                <div className="col-span-12 grid grid-cols-12 gap-3 border p-3  rounded-md">
                  <FormField
                    control={form.control}
                    name="visible"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <FormItem className=" flex flex-col items-start gap-1  col-span-6">
                        <FormLabel>공개</FormLabel>
                        <FormControl>
                          <Switch checked={value} onCheckedChange={onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <FormItem className=" flex flex-col items-start gap-1  col-span-6">
                        <FormLabel>타입</FormLabel>
                        <FormControl>
                          <Select onValueChange={onChange} value={value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="배너 타입을 선택하세요." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="notice">공지사항</SelectItem>
                              <SelectItem value="event">이벤트</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <FormItem className=" flex flex-col items-start gap-1  col-span-6">
                        <FormLabel>제목</FormLabel>{" "}
                        <FormControl>
                          <Input
                            value={value || ""}
                            onChange={onChange}
                            className="flex-1"
                            placeholder="파인파밍 X 딸기나라"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="period"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <FormItem className=" flex flex-col items-start gap-1  col-span-6">
                        <FormLabel>기간</FormLabel>{" "}
                        <FormControl>
                          <Input
                            value={value || ""}
                            onChange={onChange}
                            className="flex-1"
                            placeholder="2024년5월20일~5월31일"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <FormItem className=" flex flex-col items-start gap-1  col-span-12">
                        <FormLabel>내용</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            value={value || ""}
                            onChange={onChange}
                            className="flex-1 resize-none "
                            placeholder={`파인파밍 이용 체험 예약자 현장결제 시  인당 3천원 할인 적용(할인권은 예약확정 후 고객에게 이메일로 발송드립니다.)`}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="detailDescription"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <FormItem className=" flex flex-col items-start gap-1  col-span-12">
                        <FormLabel>자세한 내용</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={10}
                            value={value || ""}
                            onChange={onChange}
                            className="flex-1 resize-none  whitespace-pre-line"
                            placeholder={`제공혜택 : 파인파밍 이용 체험 예약자 현장결제 시  인당 3천원 할인 적용 
                                (할인권은 예약확정 후 고객에게 이메일로 발송드립니다.)

                                사용요건
                                본 할인권으로 체험할인을 받은 고객님은 
                                1) 팔당 유기농 딸기나라 네이버 영수증 리뷰와
                                2) SNS(인스타그램, 페이스북, 네이버 블로그 등) 후기를 남겨주셔야 합니다.`}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <FormItem className=" flex flex-col items-start gap-1  col-span-12">
                        <FormLabel>배너 배경 이미지</FormLabel>
                        <FormDescription>
                          메인 배너의 배경 이미지 입니다.
                        </FormDescription>
                        <FormControl>
                          <div className="w-full flex flex-col items-start gap-2">
                            {value ? (
                              <>
                                <div className="w-[200px]  aspect-[4/3] relative bg-neutral-100">
                                  <Image
                                    src={value}
                                    fill
                                    alt="업체이미지"
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                                <div className="flex flex-row items-center justify-end  ">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      form.setValue("image", "", {
                                        shouldTouch: true,
                                        shouldDirty: true,
                                      })
                                    }
                                    className="text-xs  underline text-red-500  "
                                  >
                                    삭제
                                  </button>
                                </div>
                              </>
                            ) : (
                              <label
                                htmlFor={`image`}
                                className="text-neutral-400 text-sm flex flex-col items-center gap-2 w-[200px] aspect-[4/3] justify-center cursor-pointer"
                              >
                                <PhotoIcon className="w-12" />
                                <p className="text-xs">사진을 추가해주세요.</p>
                              </label>
                            )}

                            <input
                              type="file"
                              accept="image/*"
                              id={`image`}
                              className="hidden"
                              name={`image`}
                              onChange={onMainImageChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-end gap-6 w-full">
              <Button
                type="submit"
                disabled={
                  !form.formState.isDirty ||
                  form.formState.isSubmitting ||
                  updateloading
                }
              >
                {updateloading ? (
                  <Loader2 className="size-4 animate-spin text-white" />
                ) : (
                  "생성"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
