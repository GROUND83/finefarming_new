"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useRouter } from "next/navigation";

import { getUploadUrl } from "@/lib/uploadUrl";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";
import {
  newFarmImageSchema,
  newFarmImageSchemaType,
} from "../_components/newFarmImageSchema";
import { newEvent } from "../_components/actions";
import ImageUploadComponent from "@/app/admin/_component/imageUploadComponent";
import {
  FormFooter,
  FormTitle,
  FormWrap,
} from "@/app/admin/_component/form/form";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function Page({ params }: { params: { productid: string } }) {
  //
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);

  const form = useForm<newFarmImageSchemaType>({
    resolver: zodResolver(newFarmImageSchema),
    defaultValues: {},
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState,
  } = form;
  //
  const onSubmit = handleSubmit(async (data: newFarmImageSchemaType) => {
    // 업로드 이미지
    console.log("data", data);

    // if (!data.image) {
    //   toast.error("이미지가 없습니다.");
    //   return;
    // }

    setUpdateLoading(true);
    console.log("etdata", data, params.productid);

    const jsonData = JSON.stringify({
      ...data,
      productId: Number(params.productid),
    });

    try {
      const result = await newEvent(jsonData);
      if (result) {
        router.back();
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e);
    } finally {
      setUpdateLoading(false);
    }
  });
  const onValid = async () => {
    await onSubmit();
  };

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
      const mainImageUpload = new FormData();
      mainImageUpload.append("file", file);
      // 시잔 업로드
      const response = await fetch(uploadURL, {
        method: "POST",
        body: mainImageUpload,
      });
      if (response.status !== 200) {
        return;
      }

      setValue(
        "image",
        `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}/public`,
        { shouldDirty: true }
      );
    }
  };

  return (
    <div className=" w-full flex    flex-1 ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full  flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6 "
                action={onValid}
              >
                <FormWrap>
                  <FormTitle title="이벤트" sub="이벤트를 관리하세요." />

                  <div className=" col-span-9 grid grid-cols-12 gap-6  ">
                    <FormField
                      control={control}
                      name="visible"
                      render={({ field: { onChange, onBlur, value, ref } }) => {
                        return (
                          <FormItem className=" col-span-12  space-y-0 flex flex-row items-center gap-3 ">
                            <FormLabel>공개여부</FormLabel>
                            <Switch
                              checked={value}
                              onCheckedChange={onChange}
                            />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={control}
                      name="title"
                      render={({ field: { onChange, onBlur, value, ref } }) => {
                        return (
                          <FormItem className=" col-span-12 ">
                            <FormLabel>제목</FormLabel>
                            <Input value={value || ""} onChange={onChange} />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={control}
                      name="description"
                      render={({ field: { onChange, onBlur, value, ref } }) => {
                        return (
                          <FormItem className=" col-span-12 ">
                            <FormLabel>설명</FormLabel>
                            <Textarea
                              value={value || ""}
                              onChange={onChange}
                              className=" resize-none  whitespace-pre-line"
                              rows={5}
                            />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={control}
                      name="image"
                      render={({ field: { onChange, onBlur, value, ref } }) => {
                        let images = getValues("image");
                        // console.log("images", images);
                        return (
                          <FormItem className=" col-span-6 border p-3">
                            <FormLabel>첨부이미지</FormLabel>
                            <ImageUploadComponent
                              image={images}
                              setValue={setValue}
                              onMainImageChange={onMainImageChange}
                            />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </FormWrap>
                <FormFooter>
                  <div>
                    <LoadingEditSubmitButton
                      loading={updateloading}
                      disabled={
                        !form.formState.isDirty ||
                        form.formState.isSubmitting ||
                        updateloading
                      }
                    />
                  </div>
                </FormFooter>
              </form>
            </Form>
          </div>
        </div>
      </SubSectionWrap>
    </div>
  );
}
