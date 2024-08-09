"use client";
import React from "react";
import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
//
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
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
// import { farmNewSchema, farmNewSchemaType } from "./farmNewSchema";
// import { createFarm, getFarmers } from "./actions";
import { useRouter } from "next/navigation";
import ImageUploadComponent from "@/app/admin/_component/imageUploadComponent";
import { getUploadUrl } from "@/lib/uploadUrl";
import { getProductData, updateMonthly } from "../table/actions";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import { toast } from "sonner";

export const MonthlySchema = z.object({
  id: z.number().optional(),
  month: z.string().optional(),
  mainImage: z
    .object({
      image: z.string().optional(),
      uploadUrl: z.string().optional(),
      downUrl: z.string().nullable(),
      file: z.any().optional(),
    })
    .optional(),
  products: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
      })
    )
    .optional(),
});

export default function NewMonthlyModal({ monthly }: { monthly: any }) {
  const router = useRouter();
  const [updateloading, setUpdateLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState<any>([]);

  const form = useForm<z.infer<typeof MonthlySchema>>({
    resolver: zodResolver(MonthlySchema),
    defaultValues: {},
  });
  const {
    fields: productsFields,
    append: productsAppend,
    remove: productsRemove,
  } = useFieldArray({
    control: form.control,
    name: "products",
  });
  React.useEffect(() => {
    // console.log("monthly", monthly);
    if (monthly) {
      form.reset({
        id: monthly.id,
        month: monthly.month,
        products: monthly.products || [],
        mainImage: {
          image: monthly.image ?? "",
          uploadUrl: monthly.image ?? "",
          downUrl: monthly.image ?? "",
          file: "",
        },
      });
    }
  }, [monthly, form]);

  //
  const onSubmit = async (data: any) => {
    setUpdateLoading(true);
    console.log("test", data);
    console.log("data", data);
    const formData = new FormData();
    // console.log(formState.dirtyFields);
    if (data.mainImage.file) {
      //
      console.log("file", data.mainImage.file);
      const mainImageUpload = new FormData();
      mainImageUpload.append("file", data.mainImage.file);
      // 시잔 업로드
      const response = await fetch(data.mainImage.uploadUrl, {
        method: "POST",
        body: mainImageUpload,
      });
      if (response.status !== 200) {
        return;
      }
      formData.append("mainImage", `${data.mainImage.downUrl}/public`);
    } else {
      formData.append("mainImage", data.mainImage.image);
    }
    formData.append("id", data.id);
    formData.append("products", JSON.stringify(data.products));

    try {
      const result = await updateMonthly(formData);
      console.log("result", result);
      if (result.data) {
        toast.success("데이터 수정이 성공하였습니다.");
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e);
    } finally {
      setUpdateLoading(false);
    }
    //
  };

  const onCloseModal = () => {
    //

    form.reset();
    setOpen(false); // window.location.reload();
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

      form.setValue(
        "mainImage",
        {
          image: url,
          uploadUrl: uploadURL,
          downUrl: `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}`,
          file: file,
        },
        { shouldDirty: true }
      );
    }
  };
  const getProduct = async () => {
    let res = await getProductData();
    if (res.data) {
      // console.log("Res", res);
      //
      setProducts(res.data);
    }
  };
  React.useEffect(() => {
    getProduct();
  }, []);

  const checkDisable = (product: any) => {
    //
    // console.log("product", product);
    let products = form.getValues("products");
    // console.log("products", products);
    if (products) {
      let findProduct = products.find((item) => item.id === product.id);
      if (findProduct) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // React.useEffect(() => {
  //   const subscription = form.watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   );
  //   return () => subscription.unsubscribe();
  // }, [form.watch]);
  // React.useEffect(() => {
  //   console.log(form.formState.errors);
  // }, [form.formState.errors]);
  return (
    <div className="w-full p-3 ">
      <div className="bg-white w-full p-6  ">
        <div className="w-full overflow-y-auto">
          <Form {...form}>
            <form
              className="w-full flex flex-col items-start gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
              // error response
            >
              <div className="w-full grid grid-cols-12 gap-3 ">
                <div className=" grid grid-cols-1 gap-3  col-span-6">
                  <p className=" font-semibold">이미지</p>

                  <FormField
                    control={form.control}
                    name="mainImage"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      let images = form.getValues("mainImage.image");
                      return (
                        <ImageUploadComponent
                          image={images}
                          setValue={form.setValue}
                          onMainImageChange={onMainImageChange}
                        />
                      );
                    }}
                  />
                </div>

                <div className="col-span-6 flex flex-col gap-3">
                  <p className=" font-semibold">체험상품 선택</p>
                  <div>
                    <Select
                      onValueChange={(value) => {
                        console.log("value", JSON.parse(value));
                        let valueData = JSON.parse(value);
                        let findProduct = products.find(
                          (item: { id: number }) =>
                            item.id === Number(valueData.id)
                        );
                        console.log("find", findProduct);
                        return productsAppend({
                          id: Number(findProduct.id),
                          title: findProduct.title,
                        });
                      }}
                      value={""}
                    >
                      <SelectTrigger type="button">
                        <SelectValue placeholder="체험상품를 선택하세요." />
                      </SelectTrigger>

                      <SelectContent>
                        {products.map((product: any, productIndex: any) => {
                          return (
                            <SelectItem
                              value={JSON.stringify(product)}
                              key={product.id}
                              disabled={checkDisable(product)}
                            >
                              {product.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full grid grid-cols-6 gap-3 ">
                    {productsFields.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          className="flex flex-row items-center justify-between  border p-2 col-span-3 rounded-md"
                        >
                          <p>{item.title}</p>
                          <Button
                            type="button"
                            onClick={() => productsRemove(index)}
                            size={"sm"}
                            variant={"outline"}
                          >
                            <XIcon />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="w-full border-t pt-3">
                <LoadingEditSubmitButton
                  loading={updateloading}
                  disabled={
                    !form.formState.isDirty ||
                    form.formState.isSubmitting ||
                    updateloading
                  }
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
