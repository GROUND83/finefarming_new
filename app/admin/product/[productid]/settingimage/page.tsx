"use client";
import React from "react";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

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

import {
  createBaseImageProduct,
  createBaseImageSettingProduct,
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

import SubSectionWrap from "@/app/admin/_component/subSectionWrap";

import Image from "next/image";
import ImageSelector from "@/app/admin/_component/imageSelector";

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
      if (data.images.length > 0) {
        formData.append("imagesArray", JSON.stringify(data.images));
      }

      if (data.mainImage) {
        formData.append("mainImage", data.mainImage);
      }

      formData.append("productId", params.productid);

      try {
        const result = await createBaseImageSettingProduct(formData);
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
      for (const element of product.images) {
        newImages.push({ image: element });
      }
    }
    console.log("newImages", newImages);

    form.reset({
      mainImage: product.mainImage || "",
      images: newImages || [],
    });

    setLoading(false);
  };
  //
  // React.useEffect(() => {
  //   if (form.formState.isSubmitSuccessful) {
  //     console.log(
  //       "form.formState.isSubmitSuccessful",
  //       form.formState.isSubmitSuccessful
  //     );
  //     toast.success("데이터 수정이 완료 되었습니다.");
  //     reload();
  //     console.log("done");
  //     // window.location.reload();
  //   }
  // }, [form.formState.isSubmitSuccessful]);
  //
  React.useEffect(() => {
    if (params.productid) {
      console.log("params.productid", params.productid);
      reload();
    }
  }, [params.productid]);
  //

  const images = form.getFieldState("mainImage");

  console.log("images", images);
  return (
    <div className=" w-full flex    flex-1 ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full   flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6 text-sm  "
                onSubmit={onSubmit}
              >
                <FormField
                  control={form.control}
                  name="mainImage"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <div className="grid grid-cols-12 gap-6 w-full border-b pb-12">
                      <FormTitle
                        title="대표이미지 선택"
                        sub="미리 등록한 사진 중 대표이미지를 선택하세요."
                      />
                      {value && (
                        <div className="aspect-square w-full relative col-span-3 bg-red-200">
                          <Image
                            src={value || ""}
                            width={200}
                            height={200}
                            className="object-cover w-full aspect-square"
                            priority
                            alt={`image`}
                          />
                        </div>
                      )}
                      <div className=" col-span-6">
                        <ImageSelector
                          wholeImage={wholeImage}
                          form={form}
                          value={value}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  )}
                />
                <div className=" w-full grid grid-cols-12 gap-2 ">
                  <div className=" col-span-3">
                    <FormTitle
                      title="이미지 슬라이드 선택"
                      sub="미리 등록한 사진 중 대표이미지를 선택하세요."
                    />
                    <div className="mt-3">
                      <Button
                        variant={"secondary"}
                        onClick={() => imagesForm.append({ image: "" })}
                        type="button"
                      >
                        + 이미지 추가
                      </Button>
                    </div>
                  </div>
                  <div className=" col-span-9  grid grid-cols-12 gap-2">
                    {imagesForm.fields.map((field, index) => {
                      return (
                        <FormField
                          key={index}
                          control={form.control}
                          name={`images.${index}.image`}
                          render={({ field: { value, onChange } }) => {
                            console.log("value", value);
                            return (
                              <div
                                className="flex flex-col items-start gap-2 relative  border  col-span-4 aspect-square p-3 "
                                key={index}
                              >
                                {value ? (
                                  <div className=" aspect-square w-full relative col-span-3 ">
                                    <Image
                                      src={value || ""}
                                      width={200}
                                      height={200}
                                      className="object-cover w-full aspect-square"
                                      priority
                                      alt={`image`}
                                    />
                                  </div>
                                ) : (
                                  <div className=" aspect-square w-full relative col-span-3  flex flex-col items-center justify-center">
                                    <p>이미지를 선택하세요.</p>
                                  </div>
                                )}
                                <div className="w-full flex flex-row items-center justify-between gap-2">
                                  <ImageSelector
                                    wholeImage={wholeImage}
                                    form={form}
                                    value={value}
                                    onChange={(value: any) => {
                                      console.log("value", value);

                                      form.setValue(
                                        `images.${index}.image`,
                                        value,
                                        {
                                          shouldDirty: true,
                                          shouldTouch: true,
                                        }
                                      );
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    onClick={() => imagesForm.remove(index)}
                                  >
                                    <Trash2 className="size-4" />
                                  </Button>
                                </div>
                              </div>
                            );
                          }}
                        />
                      );
                    })}
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
