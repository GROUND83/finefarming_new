"use client";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

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
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { FormTitle, FormWrap } from "@/app/admin/_component/form/form";
import { NestedArray } from "./nestedFieldArray";
type filedProps = {
  control: any;
  register: any;
  setValue: any;
  getValues: any;
};
export default function Fields({
  control,
  register,
  setValue,
  getValues,
}: filedProps) {
  //
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "optionProduct",
  });

  return (
    <div className="grid grid-cols-12 gap-6 w-full pb-12">
      <div className=" col-span-12 flex flex-col items-end justify-end ">
        <Button
          type="button"
          variant={"backdelete"}
          className=" flex flex-row items-center gap-3"
          size={"sm"}
          onClick={() => {
            append({
              essential: false,
              title: "",
              description: "",
              howto: "",
              price: 10000,
              selectProducts: [
                {
                  title: "",
                  description: "",
                  howto: "",
                  price: 10000,
                },
              ],
            });
          }}
        >
          <PlusIcon className="size-4" />
          필수 상품 추가
        </Button>
      </div>

      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-6  border p-6 rounded-md  col-span-12"
          >
            <FormTitle
              title="필수상품"
              sub={"모든 방문 그룹에 필수로 추가되는 상품입니다."}
            />

            <div className=" col-span-9  grid grid-cols-12 gap-6">
              <div className="col-span-12 flex flex-col items-end">
                <Button
                  type="button"
                  size={"sm"}
                  variant={"deleteOutline"}
                  onClick={() => remove(index)}
                >
                  삭제
                </Button>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-6 ">
                <div className=" col-span-1 gap-3 grid grid-cols-2">
                  <div className="col-span-2 flex flex-col items-start gap-2 ">
                    <FormLabel>상품 이름</FormLabel>
                    <Input
                      required
                      {...register(`optionProduct.${index}.title`)}
                    />
                  </div>
                  <div className="col-span-2 flex flex-col items-start gap-2 ">
                    <FormLabel>추가 설명</FormLabel>
                    <Input
                      {...register(`optionProduct.${index}.description`)}
                    />
                    <FormDescription className="flex flex-row items-center gap-2">
                      <ExclamationCircleIcon className="size-4" />
                      상품 이름 하단에 표시되는 안내 문구 입니다.
                    </FormDescription>
                  </div>
                  <div className="col-span-2 flex flex-col items-start gap-2 ">
                    <FormLabel>가격</FormLabel>
                    <Controller
                      control={control}
                      name={`optionProduct.${index}.price`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Input
                          type="number"
                          min={0.0}
                          value={value}
                          onChange={(e) => onChange(Number(e.target.value))}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
                {/* <div className="col-span-1 flex flex-col items-start gap-2 ">
                  <FormLabel>상품 진행 설명</FormLabel>
                  <Textarea
                    rows={10}
                    {...register(`optionProduct.${index}.howto`)}
                    className="resize-none"
                  />
                </div> */}
              </div>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
