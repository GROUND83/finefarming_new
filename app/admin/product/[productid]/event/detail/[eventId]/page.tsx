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
  editEventSchema,
  editEventSchemaType,
  newFarmImageSchema,
  newFarmImageSchemaType,
} from "../../_components/newFarmImageSchema";
import {
  deleteEvent,
  getEvent,
  newEvent,
  updateEvent,
} from "../../_components/actions";
import ImageUploadComponent from "@/app/admin/_component/imageUploadComponent";
import {
  FormFooter,
  FormTitle,
  FormWrap,
} from "@/app/admin/_component/form/form";
import {
  DeleteButton,
  LoadingEditSubmitButton,
} from "@/components/ButtonComponent";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Page({ params }: { params: { eventId: string } }) {
  //
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);

  const form = useForm<editEventSchemaType>({
    resolver: zodResolver(editEventSchema),
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
  const onSubmit = handleSubmit(async (data: editEventSchemaType) => {
    // 업로드 이미지
    console.log("data", data);

    // if (!data.image) {
    //   toast.error("이미지가 없습니다.");
    //   return;
    // }

    setUpdateLoading(true);
    console.log("etdata", data, params.eventId);

    const jsonData = JSON.stringify({
      ...data,
    });

    try {
      const result = await updateEvent(jsonData);
      if (result) {
        reload();
        toast.success("데이터 수정이 완료되었습니다.");
        // router.back();
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
  const reload = async () => {
    let result = await getEvent(Number(params.eventId));
    if (result) {
      form.reset({
        id: result.id ?? undefined,
        title: result.title ?? "",
        description: result?.description ?? "",
        visible: result?.visible ?? "",
        image: result?.image ?? "",
      });
    }
  };
  React.useEffect(() => {
    if (params.eventId) {
      reload();
    }
  }, [params.eventId]);

  const clickDelete = async () => {
    //
    try {
      setDeleteLoading(true);
      let result = await deleteEvent(Number(params.eventId));
      if (result) {
        router.back();
      }
    } catch (e) {
    } finally {
      setDeleteLoading(false);
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
                          <FormItem className=" col-span-12 border p-3">
                            <FormLabel>첨부이미지</FormLabel>
                            <div className="w-full flex flex-col items-start gap-2">
                              {images ? (
                                <>
                                  <div className="w-[400px]  h-[200px] relative bg-neutral-100">
                                    <Image
                                      src={images}
                                      fill
                                      priority
                                      alt="업체이미지"
                                      style={{ objectFit: "cover" }}
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                  </div>
                                  <div className="flex flex-row items-center justify-end  ">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setValue("image", "", {
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
                                  htmlFor="mainImage"
                                  className="text-neutral-400 text-sm flex flex-col items-center gap-2 w-[200px] aspect-[4/3] justify-center"
                                >
                                  <PhotoIcon className="w-12" />
                                  <p className="text-xs">
                                    사진을 추가해주세요.
                                  </p>
                                </label>
                              )}

                              <input
                                type="file"
                                accept="image/*"
                                id="mainImage"
                                className="hidden"
                                name="mainImage"
                                onChange={onMainImageChange}
                              />
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </FormWrap>
                <FormFooter>
                  <div className="flex flex-row  items-center gap-3">
                    <div>
                      <DeleteButton
                        onDelete={() => clickDelete()}
                        title={"이벤트를 삭제 하겠습니까?"}
                        description={"이벤트를 삭제하면 복구되지 않습니다."}
                        deleteLoading={deleteLoading}
                      />
                    </div>
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
