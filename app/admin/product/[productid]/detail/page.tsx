"use client";
import React, { useRef } from "react";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { notFound } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { toast } from "sonner";
import { XIcon } from "lucide-react";

import { getProductDetail, updateDetailProduct } from "./_component/actions";
import QuillEditor from "@/app/admin/_component/QuillEditer";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
import Image from "next/image";
import { empty_avatar_url } from "@/lib/constants";
import { detailSchema, detailSchemaType } from "./_component/detailChema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PhotoIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { getUploadUrl } from "@/lib/uploadUrl";
import { Input } from "@/components/ui/input";
import { NestedImage } from "./_component/nestImage";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import ImageSelector from "@/app/admin/_component/imageSelector";

export default function Page({ params }: { params: { productid: string } }) {
  //
  const [wholeImage, setWholeImage] = useState<any>([]);
  const [sectionType, setSectionType] = useState("mobile");
  const [product, setProduct] = useState<any>();
  const [previewModal, setPreviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const [refund, setRefund] = useState();
  const imageRef = useRef<any>(null);

  const form = useForm<detailSchemaType>({
    resolver: zodResolver(detailSchema),
    defaultValues: {},
  });
  const {
    fields: sectionsFields,
    append: sectionsAppend,
    remove: sectionsRemove,
  } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setUpdateLoading(true);
    console.log("data", data);
    let checkData = {
      image: "",
      title: "",
      titleDescription: "",
      sections: [] as any,
    };
    if (data) {
      if (data.image) {
        console.log("data.file", data.image);
        checkData.image = data.image;
      }
      checkData.title = data.title;
      checkData.titleDescription = data.titleDescription;

      for (const sections of data.sections) {
        let sectionData = {
          subtitle: sections.subtitle,
          title: sections.title,
          titleDescription: sections.titleDescription,
          images: [] as any,
        } as any;
        if (sections.images.length > 0) {
          for (const images of sections.images) {
            if (images) {
              sectionData.images.push(images);
            }
          }
        }
        checkData.sections.push(sectionData);
      }
    }
    let newdata = {
      productId: Number(params.productid),
      data: checkData,
    };

    try {
      console.log("newdata", newdata);
      let JsonData = JSON.stringify(newdata);
      let result = await updateDetailProduct(JsonData);
    } catch (e) {
      console.log(e);
    } finally {
      reload();
      setUpdateLoading(false);
    }
  });

  React.useEffect(() => {
    console.log("isDirty", form.formState.isDirty, form.formState.dirtyFields);
    if (Object.keys(form.formState.errors).length > 0) {
      console.log(form.formState.errors);
    }
  }, [form.formState]);

  const reload = async () => {
    setLoading(true);
    const id = Number(params.productid);
    if (isNaN(id)) {
      notFound();
    }
    try {
      setLoading(true);
      let response: any = await getProductDetail(Number(params.productid));
      console.log("detail", response);
      console.log("farm", response.farm);
      console.log("detail", response.detail);
      setWholeImage(response.wholeImages);
      if (!response) {
        notFound();
      }
      if (response) {
        setProduct(response);
        setRefund(response.farm.refundPolicy);

        let newDetailData = {
          image: "",
          title: "",
          titleDescription: "",
          sections: [] as any,
        };
        if (response.detail) {
          if (response.detail.image) {
            newDetailData.image = response.detail.image;
          }
          if (response.detail.title) {
            newDetailData.title = response.detail.title;
          }
          if (response.detail.titleDescription) {
            newDetailData.titleDescription = response.detail.titleDescription;
          }
          for (const sections of response.detail.sections) {
            let newSectionData = {
              subtitle: sections.subtitle,
              title: sections.title,
              titleDescription: sections.titleDescription,
              images: [] as any,
            };
            for (const image of sections.images) {
              newSectionData.images.push(image);
            }
            newDetailData.sections.push(newSectionData);
          }
          console.log("newDetailData", newDetailData);
          form.reset(newDetailData);
        }
      }
    } catch (e) {
      // router.push("/admin/user/farmer");
      // notFound();
      console.log(e);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log(
        "form.formState.isSubmitSuccessful",
        form.formState.isSubmitSuccessful
      );
      toast.success("데이터 수정이 완료 되었습니다.");
      reload();
      console.log("done");
      // window.location.reload();
    }
  }, [form.formState.isSubmitSuccessful]);
  React.useEffect(() => {
    reload();
  }, []);
  return (
    <div className=" w-full  flex-1 flex flex-col items-start   ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full  flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
            <div className="w-full grid grid-cols-12 gap-6 pb-12">
              <div className=" col-span-12 flex flex-row items-center  justify-between gap-1">
                <div>
                  <p>상세페이지</p>
                  <p className="text-xs text-neutral-500">
                    글과 사진으로 구성된 정보를 작성하여
                    <br /> 상세페이지에 노출합니다.
                  </p>
                </div>
              </div>
              <div className={`col-span-12`}>
                <div className="  grid grid-cols-12 gap-3 w-full">
                  <div className=" col-span-12 flex flex-row items-center justify-end gap-3">
                    <Button onClick={() => setSectionType("mobile")}>
                      mobile
                    </Button>

                    <Button onClick={() => setSectionType("pc")}>pc</Button>
                  </div>
                </div>
                <div
                  className={` ${
                    sectionType === "mobile"
                      ? " w-[360px] min-h-[500px]"
                      : "w-[1024px] min-h-[500px]"
                  } `}
                >
                  <p>모바일</p>
                  <Form {...form}>
                    <form
                      className="w-full flex flex-col items-start gap-6 "
                      onSubmit={onSubmit}
                    >
                      <div className="  mt-3">
                        <LoadingEditSubmitButton
                          loading={updateloading}
                          disabled={
                            !form.formState.isDirty ||
                            form.formState.isSubmitting ||
                            updateloading
                          }
                        />
                      </div>
                      <div className="w-full bg-neutral-100 border flex flex-col items-start gap-2 pb-3">
                        <FormField
                          control={form.control}
                          name="image"
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => {
                            return (
                              <div className="w-full h-[480px]   rounded-b-3xl bg-gradient-to-t from-primary relative overflow-hidden bg-white">
                                <div className="w-full h-full bg-gradient-to-t from-[#063824] to-from-[#063824] to-55%  z-10 absolute"></div>
                                {value && (
                                  <Image
                                    src={value}
                                    alt="농장이미지"
                                    fill
                                    priority
                                    style={{ objectFit: "cover" }}
                                    className=" z-0"
                                  />
                                )}
                                <div className="  absolute z-40 top-0 left-0 p-6 text-black">
                                  {!value ? (
                                    <label className=" text-sm flex flex-row items-center gap-2  border bg-white p-2 cursor-pointer">
                                      <ImageSelector
                                        wholeImage={wholeImage}
                                        form={form}
                                        value={value}
                                        onChange={(value: any) => {
                                          console.log("value", value);

                                          form.setValue("image", value, {
                                            shouldDirty: true,
                                            shouldTouch: true,
                                          });
                                        }}
                                      />
                                    </label>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        form.setValue("image", "", {
                                          shouldTouch: true,
                                          shouldDirty: true,
                                        });
                                        if (imageRef?.current) {
                                          imageRef.current.value = null;
                                        }
                                      }}
                                      className="text-xs  underline text-red-500  "
                                    >
                                      삭제
                                    </button>
                                  )}
                                  <FormMessage />
                                </div>

                                <div className="absolute z-20 bottom-0 left-0 p-6 text-white w-full">
                                  <div className="flex flex-col items-start gap-1 w-full">
                                    <FormField
                                      control={form.control}
                                      name="titleDescription"
                                      render={({
                                        field: { onChange, onBlur, value, ref },
                                      }) => {
                                        return (
                                          <input
                                            value={value}
                                            onChange={onChange}
                                            className="text-md w-full bg-transparent border-none text-white placeholder:text-white  p-0 outline-none m-0 space-y-0"
                                            placeholder="소타이틀을 한 줄로 입력해주세요"
                                          />
                                        );
                                      }}
                                    />
                                    <FormMessage />
                                    <FormField
                                      control={form.control}
                                      name="title"
                                      render={({
                                        field: { onChange, onBlur, value, ref },
                                      }) => {
                                        return (
                                          <textarea
                                            rows={2}
                                            value={value}
                                            onChange={onChange}
                                            className=" resize-none text-xl  whitespace-pre-wrap font-semibold w-full bg-transparent border-none text-white placeholder:text-white  p-0 outline-none m-0 space-y-0"
                                            placeholder={
                                              "체험 타이틀을 입력해주세요\n두 줄까지 입력 가능합니다"
                                            }
                                          />
                                        );
                                      }}
                                    />
                                    <FormMessage />
                                  </div>
                                </div>
                              </div>
                            );
                          }}
                        />

                        <div className="w-full bg-white ">
                          {sectionsFields.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className=" w-full p-3 flex flex-col items-start pb-12"
                              >
                                <div className="flex flex-col items-start gap-3 w-full ">
                                  <FormField
                                    control={form.control}
                                    name={`sections.${index}.subtitle`}
                                    render={({
                                      field: { onChange, onBlur, value, ref },
                                    }) => {
                                      return (
                                        <div className="bg-primary px-3 py-1 rounded-[3px] flex flex-col items-start">
                                          <input
                                            value={value || ""}
                                            onChange={onChange}
                                            className="resize-none text-sm  text-white placeholder:text-white   outline-none m-0 p-0  bg-transparent border-none block"
                                            placeholder="소타이틀 입력"
                                          />
                                        </div>
                                      );
                                    }}
                                  />

                                  <div className="flex flex-col items-start w-full gap-2 ">
                                    <FormField
                                      control={form.control}
                                      name={`sections.${index}.title`}
                                      render={({
                                        field: { onChange, onBlur, value, ref },
                                      }) => {
                                        return (
                                          <div className=" flex flex-col items-start w-full">
                                            <textarea
                                              rows={3}
                                              value={value || ""}
                                              onChange={onChange}
                                              className="text-xl resize-none  whitespace-pre-wrap   outline-none m-0 p-0  bg-white border-none block w-full"
                                              placeholder={`타이틀을 입력해주세요\n여러 줄 입력이 가능합니다`}
                                            />
                                          </div>
                                        );
                                      }}
                                    />
                                    <FormField
                                      control={form.control}
                                      name={`sections.${index}.titleDescription`}
                                      render={({
                                        field: { onChange, onBlur, value, ref },
                                      }) => {
                                        return (
                                          <div className=" flex flex-col items-start w-full">
                                            <textarea
                                              rows={5}
                                              value={value || ""}
                                              onChange={onChange}
                                              className="text-md resize-none  whitespace-pre-wrap   outline-none m-0 p-0  bg-white border-none block w-full"
                                              placeholder={`session의 내용을 입력하세요.\n줄바꿈을 이용해 여러줄 입력 가능합니다.`}
                                            />
                                          </div>
                                        );
                                      }}
                                    />

                                    <NestedImage
                                      nestIndex={index}
                                      control={form.control}
                                      setValue={form.setValue}
                                      wholeImage={wholeImage}
                                      form={form}
                                    />

                                    <div>
                                      <Button
                                        className="text-sm text-red-500"
                                        type="button"
                                        variant={"outline"}
                                        size={"sm"}
                                        onClick={() => sectionsRemove(index)}
                                      >
                                        session 삭제
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="pt-6 w-full flex flex-col items-end px-6 bg-white pb-3 ">
                          <Button
                            className="flex flex-row items-center text-sm"
                            type="button"
                            variant={"outline"}
                            size={"sm"}
                            onClick={() =>
                              sectionsAppend({
                                subtitle: "",
                                title: "",
                                titleDescription: "",
                                images: [],
                              })
                            }
                          >
                            <PlusIcon className="size-3" />
                            session 추가
                          </Button>
                        </div>
                        <div className="flex flex-row items-center gap-2 mt-3 px-3 text-sm text-red-500 bg-white border-t border-b p-3">
                          <ExclamationCircleIcon className="size-4" />
                          <p>
                            체험 진행순서 체험가격, 취소환불정칙 수정은
                            기본정보,옵션상품, 취소환불정책에서 수정
                          </p>
                        </div>
                        {product && (
                          <div className="px-5 w-full bg-white py-12 mt-3">
                            <div className="flex flex-row items-center justify-between w-full">
                              <p className="text-md font-semibold">
                                체험 진행 순서
                              </p>
                            </div>
                            <div className="flex flex-col items-start gap-2 mt-3 w-full">
                              {product?.process.map(
                                (process: any, processindex: any) => {
                                  return (
                                    <div
                                      key={processindex}
                                      className="w-full  bg-white flex flex-row items-start"
                                    >
                                      <div className=" w-[35px] ">
                                        <div className="w-[25px] h-[25px] flex flex-col items-center justify-center bg-primary  rounded-full">
                                          <p className="  text-white text-xs ">
                                            {processindex + 1}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-[#575757] text-sm">
                                          {process.title}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                            <div className="mt-3">
                              <div className="w-full  flex flex-row items-center gap-1  border flex-1 resize-none p-3 bg-neutral-100 rounded-md text-sm">
                                <ExclamationCircleIcon className="size-4" />
                                <p className="text-[#575757]">
                                  {product?.processNotice}
                                </p>
                              </div>
                            </div>
                            {/* <p className="text-[#575757]"> dfsafsafa</p> */}
                          </div>
                        )}
                        {product && (
                          <div className="px-5 w-full bg-[#F3F3F3] py-12">
                            <p className="text-md font-semibold">체험 가격</p>
                            {product?.priceType === "PERSONAL" ? (
                              <div className="mt-4">
                                <div className="flex flex-row items-start gap-2">
                                  <CheckCircleIcon className="size-4 text-primary" />
                                  <p className="text-sm text-neutral-500">
                                    농장 체험은 하우스에 입장하는 인원을
                                    기준으로 산정됩니다.
                                  </p>
                                </div>
                                <div className="flex flex-col items-start mt-2 text-neutral-500">
                                  {product.personalPrice.map(
                                    (item: any, index: any) => {
                                      return (
                                        <div
                                          key={index}
                                          className="flex flex-col items-start justify-start w-full  text-sm"
                                        >
                                          <div className="flex flex-row items-center justify-start gap-1 pl-6">
                                            <p className="">
                                              {item.startAge}세
                                            </p>
                                            <p>~</p>
                                            <p>{item.endAge}세</p>
                                            <p>: 1인당</p>
                                            <p>
                                              {Number(
                                                item.price
                                              ).toLocaleString()}
                                              원
                                            </p>
                                          </div>
                                          <div className="pl-6">
                                            <p className="text-sm">
                                              {item.message}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="mt-4">
                                <div className="flex flex-row items-start gap-2">
                                  <CheckCircleIcon className="size-4 text-primary" />
                                  <p className="text-sm text-neutral-500">
                                    농장 체험은 입장하는 인원을 기준으로
                                    산정됩니다.
                                  </p>
                                </div>
                                <div className="flex flex-col items-start mt-2 text-neutral-500">
                                  <div className="flex flex-col items-start justify-start gap-1 pl-6 text-sm">
                                    <div className="flex flex-row items-center gap-3">
                                      <p>그룹제한</p>
                                      <p className="">{product?.groupLimit}</p>
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                      <p>그룹당 가격</p>
                                      <p className="">
                                        {Number(
                                          product?.groupPrice
                                        ).toLocaleString()}
                                        원
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {product?.subProduct.length > 0 && (
                              <div className="flex flex-col items-start mt-2 gap-3 ">
                                {product?.subProduct.map(
                                  (item: any, index: any) => {
                                    return (
                                      <div
                                        key={index}
                                        className="flex flex-col items-start justify-start w-full gap-1"
                                      >
                                        <div className="flex flex-row items-start gap-2 ">
                                          <div>
                                            <CheckCircleIcon className="size-4 text-primary" />
                                          </div>
                                          <p className="text-sm text-neutral-500">
                                            {item.title}는 필수사항으로 체험
                                            인원과 무관하게 반드시 예약에
                                            포함됩니다.
                                          </p>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-1 pl-6 text-sm text-neutral-500">
                                          <p className="">{item.title}</p>
                                          <p className="">
                                            {Number(
                                              item.price
                                            ).toLocaleString()}
                                            원
                                          </p>
                                        </div>
                                        <div className="flex flex-row items-center justify-start  pl-6 text-sm text-neutral-500">
                                          <p>
                                            [{item.title}] 체험은 필수사항으로
                                            제외할 수 없습니다.
                                          </p>
                                        </div>
                                        {item.selectProducts.length > 0 && (
                                          <>
                                            <div className="flex flex-row items-start gap-2  ">
                                              <div>
                                                <CheckCircleIcon className="size-4 text-primary" />
                                              </div>
                                              <p className="text-sm text-neutral-500">
                                                선택 옵션
                                              </p>
                                            </div>
                                            <div className="flex flex-col items-start justify-start w-full gap-1">
                                              {item.selectProducts.map(
                                                (selectp: any, sp: any) => {
                                                  return (
                                                    <div key={sp}>
                                                      <div className="flex flex-row items-center justify-start gap-1 pl-6 text-sm text-neutral-500">
                                                        <p className="">
                                                          {selectp.title}
                                                        </p>
                                                        <p className="">
                                                          {Number(
                                                            selectp.price
                                                          ).toLocaleString()}
                                                          원
                                                        </p>
                                                      </div>
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {refund && (
                        <div className="px-5 w-full bg-[#2B2B2B]  py-12 flex flex-col items-start gap-3">
                          <p className="text-white text-md font-semibold">
                            취소 및 환불정책
                          </p>
                          <p className="text-[#C3C3C3]  whitespace-pre-wrap text-sm  leading-6 text-pretty">
                            {refund}
                          </p>
                        </div>
                      )}
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SubSectionWrap>
    </div>
  );
}
