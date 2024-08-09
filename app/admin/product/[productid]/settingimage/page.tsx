"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getUploadUrl } from "@/lib/uploadUrl";

import { Switch } from "@/components/ui/switch";

import { Input } from "@/components/ui/input";

import Link from "next/link";

import {
  createBaseImageProduct,
  createBaseProduct,
  deleteProduct,
  getProductBase,
  getProductImages,
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
import Image from "next/image";

export default function Page({ params }: { params: { productid: string } }) {
  const [wholeImage, setWholeImage] = useState<any>([]);
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

  const onSubmit = form.handleSubmit(async (data) => {
    // 업로드 이미지
    console.log("etdata", data);
    // if (!file) {
    //   return;
    // }
    setUpdateLoading(true);
    const formData = new FormData();
    if (data) {
      let imagesArray = [];
      if (data.images.length > 0) {
        for (const image of data.images) {
          if (image.file) {
            let res = await UploadFileClient({
              file: image.file,
              folderName: `product/${params.productid}`,
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

      formData.append("imagesArray", JSON.stringify(imagesArray));

      formData.append("productId", params.productid);

      try {
        const result = await createBaseImageProduct(formData);
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
  };

  const reload = async () => {
    setLoading(true);
    // const id = Number(params.id);
    // console.log("id", id);
    // if (isNaN(id)) {
    //   notFound();
    // }

    let product = await getProductBase(Number(params.productid));
    console.log("product", product);
    setWholeImage(product.wholeImages);
    let newImages = [];
    if (product.images.length > 0) {
      for (const images of product.images) {
        newImages.push({
          image: images,
          uploadUrl: "",
          downUrl: "",
          file: undefined,
        });
      }
      form.reset({ images: newImages } as any);
    }
    if (product.mainImage) {
      form.reset({
        mainImage: product.mainImage,
        uploadUrl: "",
        downUrl: "",
        file: undefined,
      } as any);
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
      toast.success("데이터 수정이 완료 되었습니다.");
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
                  <FormTitle
                    title="대표이미지 선택"
                    sub="미리 등록한 사진 중 대표이미지를 선택하세요."
                  />
                  <FormField
                    control={form.control}
                    name="mainImage"
                    render={({ field }) => (
                      <FormItem className="space-y-3 w-full col-span-9">
                        {/* <FormLabel>Notify me about...</FormLabel> */}
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value?.image || ""}
                            className="w-full grid grid-cols-12 gap-2 "
                          >
                            {wholeImage.map((item: any, index: any) => {
                              return (
                                <FormItem
                                  key={index}
                                  className="flex items-center   col-span-4  gap-2"
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value={item}
                                      className="size-4"
                                    />
                                  </FormControl>
                                  <FormLabel className="w-full">
                                    <div className=" aspect-square w-full relative">
                                      <Image
                                        src={item}
                                        fill
                                        className=" object-cover"
                                        alt={`image${index}`}
                                      />
                                    </div>
                                  </FormLabel>
                                  {/* <FormLabel className="font-normal">
                                    All new messages
                                  </FormLabel> */}
                                </FormItem>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormWrap>

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
