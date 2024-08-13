"use client";
import { DataTableComponent } from "@/components/table/tableComponent";
import {
  getMonthlyData,
  getMoreData,
  getProductData,
  updateMonthly,
} from "./_commponent/table/actions";
import { columns } from "./_commponent/table/colums";
import React from "react";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadFileClient } from "@/lib/fileUploaderClient";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ImageUploadComponent from "../_component/imageUploadComponent";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import MonthNextProduct from "./_commponent/monthNestProduct";
import { toast } from "sonner";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import { Prisma } from "@prisma/client";
const MonthlySchema = z.object({
  data: z.array(
    z.object({
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
            id: z.number().nullable(),
            title: z.string().nullable(),
          })
        )
        .optional(),
    })
  ),
});
export default function Page() {
  const [monthly, setMonthly] = React.useState<any>([]);
  const [products, setProducts] = React.useState<any>([]);
  const [updateloading, setUpdateLoading] = React.useState(false);
  const form = useForm<z.infer<typeof MonthlySchema>>({
    resolver: zodResolver(MonthlySchema),
    defaultValues: {},
  });
  const {
    fields: monthlyFields,
    append: monthlyAppend,
    remove: monthlyRemove,
  } = useFieldArray({
    control: form.control,
    name: "data",
  });

  const onSubmit = async (data: any) => {
    setUpdateLoading(true);
    console.log("test", data);
    console.log("data", data);
    const formData = new FormData();
    // console.log(formState.dirtyFields);

    for (const element of data.data) {
      if (element.mainImage.file) {
        console.log("file", element.mainImage.file);
        let res = await UploadFileClient({
          file: element.mainImage.file,
          folderName: `monthly/${monthly.id}`,
        });
        //
        if (res?.location) {
          element.newImage = res?.location;
          // formData.append("mainImage", res?.location);
        }
      } else {
        element.newImage = element.image;
      }
    }

    // formData.append("id", data.id);
    // formData.append("products", JSON.stringify(data.products));

    let newData = JSON.stringify(data);
    try {
      const result = await updateMonthly(newData);
      console.log("result", result);
      if (result.data) {
        toast.success("데이터 수정이 성공하였습니다.");
        getData();
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e);
    } finally {
      setUpdateLoading(false);
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
  const getData = async () => {
    let res = await getMonthlyData();
    console.log("res", res);
    setMonthly(res.data);
    let newArary = [];
    for (const datavalue of res.data) {
      let newdata = {
        ...datavalue,
        mainImage: {
          image: datavalue.image ?? "",
          uploadUrl: datavalue.image ?? "",
          downUrl: datavalue.image ?? "",
          file: undefined,
        },
        products: datavalue.products as Prisma.JsonValue[],
      };
      newArary.push(newdata as any);
    }
    form.reset({ data: newArary });
  };
  React.useEffect(() => {
    getData();
    getProduct();
  }, []);

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
      alert("이미지 사이즈가 50mb를 초과 하였습니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    console.log(url);

    form.setValue(
      `data.${Number(event.target.name)}.mainImage`,
      {
        image: url,
        uploadUrl: "",
        downUrl: "",
        file: file,
      },
      { shouldDirty: true }
    );
  };
  return (
    <div className="w-full bg-white">
      <Form {...form}>
        <form
          className="w-full flex flex-col items-start gap-6 p-3"
          onSubmit={form.handleSubmit(onSubmit)}
          // error response
        >
          <div>
            <Button
              type="button"
              onClick={() =>
                monthlyAppend({
                  month: "",
                  mainImage: {
                    image: "",
                    uploadUrl: "",
                    downUrl: "",
                    file: undefined,
                  },
                  products: [],
                })
              }
            >
              추가
            </Button>
          </div>
          {monthlyFields.map((month: any, monthIndex: any) => {
            return (
              <div
                key={month.id}
                className="w-full border px-6 grid grid-cols-12 gap-3"
              >
                <div className=" col-span-12 flex flex-row items-center justify-between gap-2 border-b py-6">
                  <div className="flex flex-col items-start gap-2">
                    <FormLabel>타이틀</FormLabel>
                    <Input {...form.register(`data.${monthIndex}.month`)} />
                  </div>
                  <div>
                    <Button
                      type="button"
                      size={"sm"}
                      onClick={() => monthlyRemove(monthIndex)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
                <div className=" flex flex-col items-start gap-2 col-span-3  py-6">
                  <FormField
                    control={form.control}
                    name={`data.${monthIndex}.mainImage`}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      let image = form.getValues(
                        `data.${monthIndex}.mainImage.image`
                      );
                      return (
                        <div className="w-full flex flex-col items-start gap-2">
                          {image ? (
                            <div className="border w-full p-3">
                              <div className="w-full aspect-[4/3] relative bg-neutral-100">
                                <Image
                                  src={image}
                                  fill
                                  priority
                                  alt="업체이미지"
                                  className=""
                                  style={{ objectFit: "cover" }}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>
                              <div className="flex flex-row items-center justify-end  ">
                                <button
                                  type="button"
                                  onClick={() =>
                                    form.setValue(
                                      `data.${monthIndex}.mainImage`,
                                      {
                                        image: "",
                                        uploadUrl: "",
                                        file: undefined,
                                        downUrl: "",
                                      },
                                      { shouldTouch: true, shouldDirty: true }
                                    )
                                  }
                                  className="text-xs  underline text-red-500  "
                                >
                                  이미지 삭제
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label
                              htmlFor={`data.${monthIndex}.mainImage`}
                              className="text-neutral-400 text-sm flex flex-col items-center gap-2 w-full aspect-[4/3] justify-center border"
                            >
                              <PhotoIcon className="w-12" />
                              <p className="text-xs">사진을 추가해주세요.</p>
                            </label>
                          )}

                          <input
                            type="file"
                            ref={ref}
                            accept="image/*"
                            id={`data.${monthIndex}.mainImage`}
                            className="hidden"
                            name={`${monthIndex}`}
                            onChange={onMainImageChange}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                <div className=" flex flex-col items-start gap-2 col-span-9  py-6">
                  <p>체험상품</p>

                  <MonthNextProduct
                    form={form}
                    products={products}
                    nestIndex={monthIndex}
                    {...{ control: form.control, register: form.register }}
                  />
                </div>
              </div>
            );
          })}

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
  );
}
