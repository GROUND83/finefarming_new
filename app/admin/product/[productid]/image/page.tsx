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

    let product = await getProductImages(Number(params.productid));
    console.log("product", product);
    let newdata = { ...product };
    console.log("newdata", newdata);
    let newImages = [];
    if (newdata.wholeImages.length > 0) {
      for (const images of newdata.wholeImages) {
        newImages.push({
          image: images,
          uploadUrl: "",
          downUrl: "",
          file: undefined,
        });
      }
      form.reset({ images: newImages } as any);
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
                    title="사진 정보"
                    sub="사진을 미리 등록하여 사용하세요."
                  />
                  <div className="col-span-9 grid grid-cols-12 gap-6 ">
                    <div className="grid grid-cols-8  gap-6 col-span-12  ">
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
                              let limitLength = form.getValues("images").length;
                              imagesForm.append({
                                image: "",
                                uploadUrl: "",
                                file: undefined,
                                downUrl: "",
                              });
                            }}
                          >
                            <PlusIcon className="size-6" />
                            <span>추가 사진</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
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
