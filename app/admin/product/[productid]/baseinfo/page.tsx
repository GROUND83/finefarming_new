"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ExclamationCircleIcon,
  MinusCircleIcon,
  MinusIcon,
  PencilIcon,
  PhotoIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { notFound, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { XIcon } from "lucide-react";

import { getUploadUrl } from "@/lib/uploadUrl";

import { Switch } from "@/components/ui/switch";

import { Input } from "@/components/ui/input";

import Link from "next/link";

import {
  createBaseProduct,
  deleteProduct,
  getProductBase,
  getTools,
} from "./_component/actions";
import { baseInfoSchem, baseInfoSchemType } from "./_component/baseinfoSchem";
import {
  DeleteButton,
  LoadingEditSubmitButton,
} from "@/components/ButtonComponent";
import {
  FormFooter,
  FormTitle,
  FormWrap,
} from "@/app/admin/_component/form/form";
import { Prisma } from "@prisma/client";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
import { UploadFileClient } from "@/lib/fileUploaderClient";

export default function Page({ params }: { params: { productid: string } }) {
  const [toolData, setToolsData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const router = useRouter();

  const form = useForm<baseInfoSchemType>({
    resolver: zodResolver(baseInfoSchem),
    defaultValues: {},
  });
  const imagesForm = useFieldArray({
    control: form.control,
    name: "images",
  });
  const {
    fields: educationSubjectFields,
    append: educationSubjectAppend,
    remove: educationSubjectRemove,
  } = useFieldArray({
    control: form.control,
    name: "educationSubject",
  });
  const {
    fields: groupMemberFields,
    append: groupMemberAppend,
    remove: groupMemberRemove,
  } = useFieldArray({
    control: form.control,
    name: "groupMember",
  });
  const {
    fields: personalPriceFields,
    append: personalPriceAppend,
    remove: personalPriceRemove,
  } = useFieldArray({
    control: form.control,
    name: "personalPrice",
  });
  const {
    fields: processFields,
    append: processAppend,
    remove: processRemove,
  } = useFieldArray({
    control: form.control,
    name: "process",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    // 업로드 이미지
    console.log("etdata", data);
    // if (!file) {
    //   return;
    // }
    setUpdateLoading(true);
    const formData = new FormData();
    if (data) {
      // if (data.mainImage?.file) {
      //   //
      //   let res = await UploadFileClient({
      //     file: data.mainImage.file,
      //     folderName: "product",
      //   });
      //   if (res?.location) {
      //     console.log(res.location);
      //     formData.append("mainImage", res.location);
      //   }
      // } else {
      //   //
      // }
      let imagesArray = [];
      if (data.images.length > 0) {
        //

        for (const image of data.images) {
          if (image.file) {
            let res = await UploadFileClient({
              file: image.file,
              folderName: "product",
            });
            if (res?.location) {
              console.log(res.location);
              imagesArray.push(res.location);
              // formData.append("mainImage", res.location);
            }
            // imagesArray.push(image.downUrl);
          } else {
            if (image.image) {
              imagesArray.push(image.image);
            } else {
            }
          }
        }
      }
      // let mainImage = data.mainImage?.downUrl;
      // let imagesArray = [];
      // if (data.images.length > 0) {
      //   for (const image of data.images) {
      //     if (image.downUrl) {
      //       imagesArray.push(image.downUrl);
      //     }
      //   }
      // }

      let coupydata = {
        cloth: data.cloth,
        description: data.description,
        educationData: data.educationData,
        educationSubject: data.educationSubject,
        educationTitle: data.educationTitle,
        farmInsideType: data.farmInsideType,
        groupLimit: data.groupLimit,
        groupMember: data.groupMember,
        groupPrice: data.groupPrice,
        personalPrice: data.personalPrice,
        priceType: data.priceType,
        process: data.process,
        processNotice: data.processNotice,
        status: data.status,
        title: data.title,
        tools: data.tools,
        visible: data.visible,
      };

      let newData = JSON.stringify({
        ...coupydata,
      });
      console.log("newData", newData);
      formData.append("imagesArray", JSON.stringify(imagesArray));
      formData.append("newData", newData);
      // formData.append("farmId", params.id);
      formData.append("productId", params.productid);

      try {
        const result = await createBaseProduct(formData);
        toast.success("데이터 수정이 완료 되었습니다.");
      } catch (e: any) {
        console.log(e);
        toast.error(e);
      } finally {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        setUpdateLoading(false);
        // window.location.reload();
      }
    }
  });

  const deleteItem = async () => {
    //
    console.log("delete");
    setDeleteLoading(true);
    //
    try {
      const formData = new FormData();
      formData.append("productId", params.productid);
      const result = await deleteProduct(formData);
      if (result) {
        toast.success("삭제 완료 되었습니다.");
        router.push(`/admin/farm`);
      }
    } catch (e: any) {
      toast.error(e);
    }
    setDeleteLoading(false);
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
    if (file.size > 50000000) {
      toast.warning("이미지 사이즈가 50mb를 초과 하였습니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    console.log(url);
    let key = `mainImage.image`;
    let fileKey = `mainImage.file`;
    console.log(key, event.target.name);
    form.setValue(key as any, url, { shouldDirty: true });
    form.setValue(fileKey as any, file, { shouldDirty: true });

    // const { success, result } = await getUploadUrl();
    // console.log(result);
    // if (success) {
    //   const { id, uploadURL } = result;
    //   // upload?
    //   const mainImageUpload = new FormData();
    //   mainImageUpload.append("file", file);
    //   // 시잔 업로드
    //   const response = await fetch(uploadURL, {
    //     method: "POST",
    //     body: mainImageUpload,
    //   });
    //   if (response.status !== 200) {
    //     return;
    //   }
    //   form.setValue(
    //     "mainImage" as any,
    //     {
    //       image: url,
    //       uploadUrl: uploadURL,
    //       downUrl: `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}/public`,
    //     },
    //     { shouldValidate: true }
    //   );
    // }
  };
  const onOtherImageChange = async (
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
    if (file.size > 50000000) {
      toast.warning("이미지 사이즈가 50mb를 초과 하였습니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    console.log(url);
    let key = `images.${event.target.alt}.image`;
    let fileKey = `images.${event.target.alt}.file`;
    console.log(key, event.target.name);
    form.setValue(key as any, url, { shouldDirty: true });
    form.setValue(fileKey as any, file, { shouldDirty: true });
    // const { success, result } = await getUploadUrl();
    // console.log(result);
    // if (success) {
    //   const { id, uploadURL } = result;
    //   // upload?
    //   const mainImageUpload = new FormData();
    //   mainImageUpload.append("file", file);
    //   // 시잔 업로드
    //   const response = await fetch(uploadURL, {
    //     method: "POST",
    //     body: mainImageUpload,
    //   });
    //   if (response.status !== 200) {
    //     return;
    //   }
    //   let key = `images.${event.target.alt}`;

    //   form.setValue(
    //     key as any,
    //     {
    //       image: url,
    //       uploadUrl: uploadURL,
    //       downUrl: `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}/public`,
    //     },
    //     { shouldValidate: true }
    //   );
    // }
  };

  const reload = async () => {
    setLoading(true);
    // const id = Number(params.id);
    // console.log("id", id);
    // if (isNaN(id)) {
    //   notFound();
    // }
    const response = await getTools();
    console.log("response", response);
    if (response.length > 0) {
      // setToolsData(response.facility);
      setToolsData(response);
    }
    let product = await getProductBase(Number(params.productid));
    console.log("product", product);
    let newdata = { ...product };
    console.log("newdata", newdata);
    if (newdata?.mainImage == null) {
      let newob = {
        image: "",
        uploadUrl: "",
        downUrl: "",
        file: "",
      };
      let newImages = [];
      if (newdata.images.length > 0) {
        for (const images of newdata.images) {
          newImages.push({
            image: images,
            uploadUrl: "",
            downUrl: "",
            file: undefined,
          });
        }
      }
      let newone = {
        ...newdata,
        personalPrice: [...product.personalPrice] as Prisma.JsonValue[],
        educationSubject: [...product.educationSubject] as Prisma.JsonValue[],

        images: newImages,
      };

      if (newone) {
        form.reset(newone as any);
      }
    } else {
      let newImages = [];
      if (newdata.images.length > 0) {
        for (const images of newdata.images) {
          newImages.push({
            image: images,
            uploadUrl: "",
            downUrl: "",
            file: undefined,
          });
        }
      }
      let newone = { ...newdata, images: newImages };
      console.log("newone", newone);
      form.reset(newone as any);
    }
    setLoading(false);
  };
  //
  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log(
        "form.formState.isSubmitSuccessful",
        form.formState.isSubmitSuccessful
      );
      // toast.success("데이터 수정이 완료 되었습니다.");
      reload();
      console.log("done");
      // window.location.reload();
    }
  }, [form.formState.isSubmitSuccessful]);
  //
  React.useEffect(() => {
    if (params.productid) {
      console.log("params.productid", params.productid);
      reload();
    }
  }, [params.productid]);
  //
  return (
    <div className=" w-full flex    flex-1 ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full   flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6 text-sm "
                onSubmit={onSubmit}
              >
                <FormWrap>
                  <FormTitle title="상품 기본 정보" sub="" />

                  <div className="col-span-9 grid grid-cols-2 gap-6 ">
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-row items-center gap-3  space-y-0">
                            <Select
                              onValueChange={onChange}
                              defaultValue={value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="체험상품 상태를 입력하세요." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="POSSIBLE">
                                  예약가능
                                </SelectItem>
                                <SelectItem value="FINISHED">
                                  예약종료
                                </SelectItem>
                                <SelectItem value="TESTING">테스트</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="visible"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-row items-center gap-3  space-y-0">
                            <FormControl>
                              <Switch
                                checked={value}
                                onCheckedChange={onChange}
                              />
                            </FormControl>
                            {value ? (
                              <FormLabel>공개</FormLabel>
                            ) : (
                              <FormLabel>비공개</FormLabel>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col items-start ">
                            <FormLabel>상품 이름</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                value={value || ""}
                                placeholder="상품 이름을 입력하세요."
                                onChange={onChange}
                                required
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col items-start ">
                            <FormLabel>추가 설명</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                value={value || ""}
                                placeholder="추가 설명을 입력하세요."
                                onChange={onChange}
                                required
                              />
                            </FormControl>
                            <FormDescription className="flex flex-row items-center gap-2">
                              <ExclamationCircleIcon className="size-4" />
                              상품 이름 하단에 표시되는 안내 문구 입니다.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2  w-full flex flex-col gap-2">
                      <div className="w-full flex flex-row items-center justify-start gap-3">
                        <FormLabel>체험 진행 순서</FormLabel>
                        <button
                          type="button"
                          className="flex flex-row items-center gap-1 text-sm  text-primary"
                          onClick={() =>
                            processAppend({
                              title: "",
                            })
                          }
                        >
                          <PlusIcon className="size-4" />
                          추가
                        </button>
                      </div>
                      <div className="flex flex-col items-start gap-1 w-full flex-1">
                        {processFields.map((field, y) => {
                          return (
                            <div
                              className="flex flex-row items-center gap-2 relative  col-span-2 w-full"
                              key={y}
                            >
                              <FormField
                                control={form.control}
                                name={`process.${y}.title`}
                                render={({ field: { onChange, value } }) => (
                                  <FormItem className="flex flex-row items-center gap-1 w-full space-y-0">
                                    <p className="border px-3 py-2 rounded-md text-sm">
                                      {y + 1}
                                    </p>
                                    <FormControl>
                                      <Input
                                        value={value || ""}
                                        onChange={onChange}
                                        placeholder="체험 진행 순서"
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />

                              <Button
                                type="button"
                                variant={"outline"}
                                onClick={() => processRemove(y)}
                              >
                                <XIcon className="size-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                      <div className="col-span-2 mt-3">
                        <FormField
                          control={form.control}
                          name={"processNotice"}
                          render={({ field: { onChange, value } }) => (
                            <FormItem className="flex flex-col items-start ">
                              <FormLabel>체험 진행 주의사항</FormLabel>
                              <FormControl>
                                <Input
                                  value={value || ""}
                                  onChange={onChange}
                                  placeholder="체험 진행 주의사항"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </FormWrap>
                {/* <FormWrap>
                  <FormTitle title="사진 정보" sub="" />
                  <div className="col-span-9 grid grid-cols-12 gap-6 ">
                    <div className="col-span-4">
                      <FormField
                        control={form.control}
                        name="mainImage"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <div className="w-full flex flex-col items-start gap-2 col-span-4">
                            <label
                              htmlFor="mainImage"
                              className=" aspect-square flex flex-col items-center justify-center  bg-center cursor-pointer bg-cover  border w-full "
                              style={{
                                backgroundImage: `url(${form.getValues(
                                  "mainImage.image"
                                )})`,
                              }}
                            >
                              {form.getValues("mainImage.image") === "" ? (
                                <div className="text-neutral-400 text-sm flex flex-col items-center gap-2 w-full justify-center">
                                  <PhotoIcon className="w-12" />
                                  <p className="text-xs">
                                    대표사진을 추가해주세요.
                                  </p>
                                </div>
                              ) : null}
                            </label>
                            {form.getValues(`mainImage.image`) && (
                              <div className="flex flex-row items-center justify-end w-1/2 ">
                                <button
                                  type="button"
                                  onClick={() =>
                                    form.setValue(
                                      "mainImage",
                                      {
                                        image: "",
                                        uploadUrl: "",
                                        file: undefined,
                                        downUrl: "",
                                      },
                                      { shouldTouch: true, shouldDirty: true }
                                    )
                                  }
                                  className="text-xs  underline  "
                                >
                                  삭제
                                </button>
                              </div>
                            )}

                            <input
                              type="file"
                              accept="image/*"
                              id="mainImage"
                              className="hidden"
                              //  onChange={onOtherImageChange}
                              name="mainImage"
                              onChange={onMainImageChange}
                              // {...register(`images.${index}.image`)}
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div className="col-span-8 grid grid-cols-4 ">
                      <div className="grid grid-cols-8  gap-6 col-span-4  ">
                        {imagesForm.fields.map((field, index) => {
                          console.log("field", field);
                          return (
                            <div
                              className="flex flex-col items-start gap-2 relative  col-span-2"
                              key={index}
                            >
                              <label
                                htmlFor={field.id}
                                className=" aspect-square  flex flex-col items-center justify-center  bg-center cursor-pointer bg-cover w-full border "
                                style={{
                                  backgroundImage: `url(${form.getValues(
                                    `images.${index}.image`
                                  )})`,
                                }}
                              >
                                {form.getValues(`images.${index}.image`) ===
                                "" ? (
                                  <div className="text-neutral-400 text-sm flex flex-col items-center gap-2 w-full justify-center">
                                    <PhotoIcon className="w-6" />
                                    <p className="text-xs">
                                      사진을 추가해주세요.
                                    </p>
                                  </div>
                                ) : null}
                              </label>
                              <div className="flex flex-row items-center justify-end w-full absolute top-0 right-0">
                                <button
                                  type="button"
                                  onClick={() => imagesForm.remove(index)}
                                  className="text-xs   border rounded-full bg-red-500/80 hover:bg-red-500/50 transition-colors  w-5 h-5 flex flex-col items-center justify-center border-red-500 "
                                >
                                  <MinusIcon className="size-3 text-white" />
                                </button>
                              </div>
                              <input
                                alt={index.toString()}
                                id={field.id}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                name={`images.${index}`}
                                onChange={onOtherImageChange}
                                key={field.id}
                              />
                            </div>
                          );
                        })}
                        <div className="flex flex-col items-start gap-3 relative  col-span-2">
                          <div className=" aspect-square  flex flex-col items-center justify-center  bg-center cursor-pointer bg-cover w-full border ">
                            <Button
                              type="button"
                              className="w-full h-full flex flex-col items-center justify-center gap-3 text-xs text-neutral-500"
                              variant={"ghost"}
                              onClick={() => {
                                console.log(form.getValues("images").length);
                                let limitLength =
                                  form.getValues("images").length;
                                if (limitLength >= 9) {
                                  toast.warning("9개 까지 업로드 가능합니다.");
                                } else {
                                  imagesForm.append({
                                    image: "",
                                    uploadUrl: "",
                                    file: undefined,
                                    downUrl: "",
                                  });
                                }
                              }}
                            >
                              <PlusIcon className="size-6" />
                              <span>추가 사진</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FormWrap> */}
                <FormWrap>
                  <FormTitle title="요금 정보" sub="" />

                  <div className="col-span-9 grid grid-cols-12 gap-6 ">
                    <div className="col-span-12">
                      <FormField
                        control={form.control}
                        name="priceType"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col items-start  w-full ">
                            <FormLabel>요금 단위</FormLabel>
                            <FormControl className="w-full p-3">
                              <RadioGroup
                                onValueChange={onChange}
                                value={value}
                                className="flex flex-col  items-start justify-start gap-6"
                              >
                                <FormItem className="flex flex-col items-start gap-2 border w-full p-3 rounded-md">
                                  <div className="flex flex-row items-center gap-3">
                                    <FormControl>
                                      <RadioGroupItem value="GROUP" />
                                    </FormControl>
                                    <div className="flex flex-col items-start gap-1">
                                      <FormLabel className="font-normal">
                                        그룹
                                      </FormLabel>
                                      <FormDescription>
                                        방문 그룹 당 부과
                                      </FormDescription>
                                    </div>
                                  </div>
                                  <div className="flex flex-row items-center gap-6 w-full px-6">
                                    <div className="flex-1">
                                      <FormField
                                        control={form.control}
                                        name="groupLimit"
                                        render={({
                                          field: { value, onChange },
                                        }) => (
                                          <FormItem className="flex flex-col items-start w-full ">
                                            <FormLabel>그룹 최대인원</FormLabel>
                                            <FormControl className=" flex-1 w-full">
                                              <div className="flex flex-row items-center gap-2 border rounded-md flex-1 ">
                                                <div className="px-3 w-[80px] border-r flex flex-col items-center justify-center">
                                                  <p>그룹 당</p>
                                                </div>
                                                <Input
                                                  type="number"
                                                  value={value || 5}
                                                  placeholder="그룹 별 인원제한을 입력하세요."
                                                  onChange={onChange}
                                                  className="border-none flex-1"
                                                />
                                                <div className="px-3 w-[40px] border-l flex flex-col items-center justify-center">
                                                  <p>명</p>
                                                </div>
                                              </div>
                                            </FormControl>

                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <FormField
                                        control={form.control}
                                        name="groupPrice"
                                        render={({
                                          field: { value, onChange },
                                        }) => (
                                          <FormItem className="flex flex-col items-start w-full ">
                                            <FormLabel>요금</FormLabel>
                                            <FormControl className=" flex-1 w-full">
                                              <div className="flex flex-row items-center gap-2 border rounded-md flex-1 ">
                                                <div className="px-3 w-[80px] border-r flex flex-col items-center justify-center">
                                                  <p>그룹 당</p>
                                                </div>
                                                <Input
                                                  type="number"
                                                  value={value || 10000}
                                                  placeholder="요금을 입력하세요."
                                                  onChange={onChange}
                                                  className="border-none flex-1"
                                                />
                                                <div className="px-3 w-[40px] border-l flex flex-col items-center justify-center">
                                                  <p>원</p>
                                                </div>
                                              </div>
                                            </FormControl>

                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-span-2  w-full">
                                    <div className="flex flex-row items-center gap-3 relative  col-span-2">
                                      <FormLabel>연령대별 최대인원</FormLabel>
                                      <Button
                                        type="button"
                                        variant={"outline"}
                                        size={"sm"}
                                        onClick={() => {
                                          console.log(
                                            form.getValues("groupMember").length
                                          );
                                          let limitLength =
                                            form.getValues(
                                              "groupMember"
                                            ).length;
                                          if (limitLength >= 5) {
                                            toast.warning(
                                              "5개 까지 업로드 가능합니다."
                                            );
                                          } else {
                                            groupMemberAppend({
                                              message: "",
                                              startAge: "1",
                                              endAge: "2",
                                              isFree: false,
                                            });
                                          }
                                        }}
                                      >
                                        <PlusIcon className="size-3" />
                                      </Button>
                                    </div>
                                    <div className="text-xs flex flex-row items-center gap-1 mt-3">
                                      <ExclamationCircleIcon className="size-4" />
                                      <p>
                                        연령별로 구분하여 요금 설정, 최대 5개
                                        입력
                                      </p>
                                    </div>
                                    <div className="grid grid-cols-5 gap-3 col-span-2 w-full mt-3">
                                      {groupMemberFields.map((item, index) => {
                                        return (
                                          <div
                                            className=" grid grid-cols-12 gap-6 relative  col-span-5  border p-6 rounded-md"
                                            key={index}
                                          >
                                            <div className=" gap-6  grid grid-cols-12 col-span-12">
                                              <div className="flex flex-col items-start gap-3  col-span-6">
                                                <FormLabel>연령대</FormLabel>
                                                <div className="flex flex-row items-center gap-3">
                                                  <div className="flex flex-row items-center gap-2 border rounded-md flex-1 ">
                                                    <Input
                                                      {...form.register(
                                                        `groupMember.${index}.startAge`
                                                      )}
                                                      className="border-none"
                                                    />
                                                    <div className="px-3 w-[40px] border-l flex flex-col items-center justify-center">
                                                      <p>세</p>
                                                    </div>
                                                  </div>

                                                  <p>~</p>
                                                  <div className="flex flex-row items-center gap-2 border rounded-md flex-1 ">
                                                    <Input
                                                      {...form.register(
                                                        `groupMember.${index}.endAge`
                                                      )}
                                                      className="border-none"
                                                    />
                                                    <div className="px-3 w-[40px] border-l flex flex-col items-center justify-center">
                                                      <p>세</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <button
                                                  type="button"
                                                  className="text-red-500 underline"
                                                  onClick={() =>
                                                    groupMemberRemove(index)
                                                  }
                                                >
                                                  삭제
                                                </button>
                                              </div>
                                              <div className="flex flex-col items-start gap-3  col-span-6">
                                                <FormLabel>
                                                  인원수 포함여부
                                                </FormLabel>
                                                <div className="flex flex-row items-center gap-3 w-full">
                                                  <Controller
                                                    control={form.control}
                                                    name={`groupMember.${index}.isFree`}
                                                    render={({
                                                      field: {
                                                        value,
                                                        onChange,
                                                      },
                                                    }) => {
                                                      return (
                                                        <div className="flex flex-row items-center gap-3">
                                                          <Checkbox
                                                            checked={value}
                                                            onCheckedChange={(
                                                              checked
                                                            ) =>
                                                              onChange(checked)
                                                            }
                                                            id={`groupMember.${index}.isFree`}
                                                            className="z-4 rounded-none"
                                                          />
                                                          <label
                                                            htmlFor={`groupMember.${index}.isFree`}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                          >
                                                            무료
                                                          </label>
                                                        </div>
                                                      );
                                                    }}
                                                  />
                                                </div>
                                                <div className="w-full flex-1 flex flex-col items-start gap-3">
                                                  <FormLabel>
                                                    안내 메세지
                                                  </FormLabel>
                                                  <Input
                                                    // name={`groupPrices[${index}].message`}
                                                    {...form.register(
                                                      `groupMember.${index}.message`
                                                    )}
                                                  />
                                                  <FormDescription className="text-xs flex flex-row items-center gap-1">
                                                    <ExclamationCircleIcon className="size-4" />
                                                    요금 하단에 표시되는 안내
                                                    문구입니다.
                                                  </FormDescription>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </FormItem>
                                <FormItem className="flex flex-col items-start gap-2 border w-full p-3 rounded-md">
                                  <div className="flex flex-row items-center gap-3 w-full">
                                    <FormControl>
                                      <RadioGroupItem value="PERSONAL" />
                                    </FormControl>
                                    <div className="flex flex-col items-start gap-1 w-full">
                                      <FormLabel className="font-normal">
                                        인원
                                      </FormLabel>
                                      <FormDescription>
                                        방문 인원 당 부과
                                      </FormDescription>
                                    </div>
                                  </div>

                                  <div className="col-span-2  w-full">
                                    <div className="flex flex-row items-center gap-3 relative  col-span-2">
                                      <FormLabel>인원별 요금</FormLabel>
                                      <Button
                                        type="button"
                                        variant={"outline"}
                                        size={"sm"}
                                        onClick={() => {
                                          console.log(
                                            form.getValues("personalPrice")
                                              .length
                                          );
                                          let limitLength =
                                            form.getValues(
                                              "personalPrice"
                                            ).length;
                                          if (limitLength >= 5) {
                                            toast.warning(
                                              "5개 까지 업로드 가능합니다."
                                            );
                                          } else {
                                            personalPriceAppend({
                                              price: "1000",
                                              message: "",
                                              startAge: "1",
                                              endAge: "2",
                                              isFree: false,
                                            });
                                          }
                                        }}
                                      >
                                        <PlusIcon className="size-3" />
                                      </Button>
                                    </div>
                                    <div className="text-xs flex flex-row items-center gap-1 mt-3">
                                      <ExclamationCircleIcon className="size-4" />
                                      <p>
                                        인원별로 구분하여 요금 설정, 최대 5개
                                        입력
                                      </p>
                                    </div>
                                    <div className="grid grid-cols-5 gap-3 col-span-2 w-full mt-3">
                                      {personalPriceFields.map(
                                        (item, index) => {
                                          return (
                                            <div
                                              className=" grid grid-cols-12 gap-6 relative  col-span-5  border p-6 rounded-md"
                                              key={index}
                                            >
                                              <div className=" gap-6  grid grid-cols-12 col-span-12">
                                                <div className="flex flex-col items-start gap-3  col-span-6">
                                                  <FormLabel>연령대</FormLabel>
                                                  <div className="flex flex-row items-center gap-3">
                                                    <div className="flex flex-row items-center gap-2 border rounded-md flex-1 ">
                                                      <Input
                                                        {...form.register(
                                                          `personalPrice.${index}.startAge`
                                                        )}
                                                        className="border-none"
                                                      />
                                                      <div className="px-3 w-[40px] border-l flex flex-col items-center justify-center">
                                                        <p>세</p>
                                                      </div>
                                                    </div>

                                                    <p>~</p>
                                                    <div className="flex flex-row items-center gap-2 border rounded-md flex-1 ">
                                                      <Input
                                                        {...form.register(
                                                          `personalPrice.${index}.endAge`
                                                        )}
                                                        className="border-none"
                                                      />
                                                      <div className="px-3 w-[40px] border-l flex flex-col items-center justify-center">
                                                        <p>세</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <button
                                                    type="button"
                                                    className="text-red-500 underline"
                                                    onClick={() =>
                                                      personalPriceRemove(index)
                                                    }
                                                  >
                                                    삭제
                                                  </button>
                                                </div>
                                                <div className="flex flex-col items-start gap-3  col-span-6">
                                                  <FormLabel>요금</FormLabel>
                                                  <div className="flex flex-row items-center gap-3 w-full">
                                                    <Controller
                                                      control={form.control}
                                                      name={`personalPrice.${index}.isFree`}
                                                      render={({
                                                        field: {
                                                          value,
                                                          onChange,
                                                        },
                                                      }) => {
                                                        return (
                                                          <div className="flex flex-row items-center gap-3">
                                                            <Checkbox
                                                              checked={value}
                                                              onCheckedChange={(
                                                                checked
                                                              ) =>
                                                                onChange(
                                                                  checked
                                                                )
                                                              }
                                                              id={`personalPrice.${index}.isFree`}
                                                              className="z-4 rounded-none"
                                                            />
                                                            <label
                                                              htmlFor={`personalPrice.${index}.isFree`}
                                                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                              무료
                                                            </label>
                                                          </div>
                                                        );
                                                      }}
                                                    />
                                                    <div className="flex flex-row items-center gap-1">
                                                      <div className="flex flex-row items-center gap-2 border rounded-md flex-1 ">
                                                        <Input
                                                          {...form.register(
                                                            `personalPrice.${index}.price`
                                                          )}
                                                          className="border-none"
                                                        />
                                                        <div className="px-3 w-[40px] border-l flex flex-col items-center justify-center">
                                                          <p>원</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="w-full flex-1 flex flex-col items-start gap-3">
                                                    <FormLabel>
                                                      안내 메세지
                                                    </FormLabel>
                                                    <Input
                                                      // name={`personalPrice[${index}].message`}
                                                      {...form.register(
                                                        `personalPrice.${index}.message`
                                                      )}
                                                    />
                                                    <FormDescription className="text-xs flex flex-row items-center gap-1">
                                                      <ExclamationCircleIcon className="size-4" />
                                                      요금 하단에 표시되는 안내
                                                      문구입니다.
                                                    </FormDescription>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </FormWrap>
                <FormWrap>
                  <FormTitle title="체험 준비물 정보" sub="" />

                  <div className="col-span-9 grid grid-cols-2 gap-6 ">
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="farmInsideType"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                            <FormControl>
                              <Switch
                                checked={value}
                                onCheckedChange={onChange}
                              />
                            </FormControl>
                            <div className="flex flex-col gap-3">
                              {value ? (
                                <FormLabel>악천우 시 체험진행 가능</FormLabel>
                              ) : (
                                <FormLabel>악천우 시 체험진행 불가능</FormLabel>
                              )}

                              <FormDescription className="text-xs flex flex-row items-center gap-1">
                                <ExclamationCircleIcon className="size-4" />
                                우천이나 악천후 등 기상 상황과 무관하게 체험할
                                공간이 있는 경우
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="tools"
                        render={() => (
                          <FormItem className="w-full flex flex-col items-start gap-3 ">
                            <div className="flex flex-row items-center gap-3">
                              <span className="text-sm">준비물</span>
                              <Link
                                href={"/admin/setting/farmitem"}
                                className="text-primary underline"
                              >
                                준비물 관리
                              </Link>
                            </div>
                            <div className="flex flex-row items-center gap-6 w-full">
                              {toolData.map((item: any) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="tools"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-center space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            className="size-4 rounded-none"
                                            checked={field.value?.includes(
                                              item.title
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    item.title,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.title
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {item.title}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="cloth"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col gap-2 w-full">
                            <FormLabel>안내문구</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="안내문구를 입력하세요."
                                className="resize-none"
                                value={value || ""}
                                onChange={onChange}
                              />
                            </FormControl>
                            <FormDescription className="text-xs flex flex-row items-center gap-1">
                              <ExclamationCircleIcon className="size-4" />
                              구비 도구 하단에 고객에 노출되는 복장 안내입니다.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </FormWrap>

                <div className="grid grid-cols-12 gap-6 w-full border-b pb-12">
                  <div className="col-span-3">
                    <h1 className="text-sm font-bold">교육 정보</h1>
                  </div>
                  <div className="col-span-9 grid grid-cols-2 gap-6 ">
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="educationTitle"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>안내문구</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="안내문구를 입력하세요."
                                className="resize-none"
                                value={value || ""}
                                onChange={onChange}
                              />
                            </FormControl>
                            <FormDescription className="text-xs flex flex-row items-center gap-1">
                              <ExclamationCircleIcon className="size-4" />
                              상세 페이지 대표사진 하단에 노출되는 교육 안내
                              문구 (최대 100자)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name="educationData"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel>교육 자료 제공</FormLabel>

                            <FormControl>
                              <Switch
                                checked={value}
                                onCheckedChange={onChange}
                              />
                            </FormControl>

                            <FormDescription className="text-xs flex flex-row items-center gap-1">
                              <ExclamationCircleIcon className="size-4" />
                              농장에서 사전 준비된 교육 자료를 제공 여부
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="flex flex-row items-center gap-3 relative  col-span-2">
                        <FormLabel>교육 주제</FormLabel>
                        <Button
                          type="button"
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => {
                            console.log(
                              form.getValues("educationSubject").length
                            );
                            let limitLength =
                              form.getValues("educationSubject").length;
                            if (limitLength >= 5) {
                              toast.warning("5개 까지 업로드 가능합니다.");
                            } else {
                              educationSubjectAppend({
                                tag: "",
                              });
                            }
                          }}
                        >
                          <PlusIcon className="size-3" />
                        </Button>
                      </div>
                      <div className="text-xs flex flex-row items-center gap-1 mt-3">
                        <ExclamationCircleIcon className="size-4" />
                        <p>소개글 하단에 노출되는 교육 주제, 최대 5개 입력</p>
                      </div>
                      <div className="grid grid-cols-5 gap-3 col-span-2 w-full mt-3">
                        {educationSubjectFields.map((item, x) => {
                          // console.log("educationSubjectForm", item);
                          return (
                            <div
                              className="flex flex-row items-center gap-2 relative  col-span-2"
                              key={x}
                            >
                              <Controller
                                control={form.control}
                                name={`educationSubject.${x}.tag`}
                                render={({ field: { onChange, value } }) => (
                                  <Input
                                    value={value || ""}
                                    onChange={onChange}
                                  />
                                )}
                              />

                              <Button
                                type="button"
                                variant={"outline"}
                                onClick={() => educationSubjectRemove(x)}
                              >
                                <XIcon className="size-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <FormFooter>
                  <div>
                    <DeleteButton
                      onDelete={() => deleteItem()}
                      title="상품을 삭제하겠습니까?"
                      description="상품을 삭제하면 관련된데이터(옵션상품,상세페이지,예약내역)
                모두 삭제됩니다."
                      deleteLoading={deleteLoading}
                    />
                  </div>
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
