"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { XIcon } from "lucide-react";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

type nestedProps = {
  nestIndex: any;
  control: any;
  register: any;
};
export const NestedArray = ({ nestIndex, control, register }: nestedProps) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `optionProduct.${nestIndex}.selectProducts`,
  });

  return (
    <div className="col-span-12 grid grid-cols-12 gap-6 ">
      <div className=" col-span-12 flex flex-row items-center justify-between bg-neutral-100 px-6  py-2 rounded-md border">
        <div className="flex flex-col items-start gap-1 ">
          <FormLabel>선택 상품</FormLabel>
          <div className="flex flex-row items-center gap-2">
            <ExclamationCircleIcon className="size-4" />
            <p className="text-xs text-neutral-500">
              방문 그룹이 필요에 따라 선택하는 상품입니다.
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end ">
          <Button
            type="button"
            variant={"outline"}
            size={"sm"}
            onClick={() =>
              append({
                title: "",
                description: "",
                howto: "",
                price: 10000,
              })
            }
          >
            <PlusIcon className="size-3" />
          </Button>
        </div>
      </div>
      <div className=" col-span-12  grid grid-cols-12 gap-6">
        {fields.map((item, k) => {
          console.log("fields", fields);
          return (
            <div
              key={item.id}
              className="col-span-12 grid grid-cols-2 gap-6 border p-6  rounded-md pb-12 relative"
            >
              <div className="flex flex-col absolute top-2 right-2">
                <Button
                  type="button"
                  variant={"deleteOutline"}
                  size={"sm"}
                  onClick={() => remove(k)}
                >
                  삭제
                </Button>
              </div>
              <div className=" gap-6  grid grid-cols-6 col-span-2 mt-6  ">
                <div className="flex flex-col items-start gap-3  col-span-3">
                  <FormLabel>상품 이름</FormLabel>
                  <Controller
                    control={control}
                    name={`optionProduct.${nestIndex}.selectProducts.${k}.title`}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Input
                        type="text"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        required
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col items-start gap-3  col-span-3">
                  <FormLabel>가격</FormLabel>
                  <Controller
                    control={control}
                    name={`optionProduct.${nestIndex}.selectProducts.${k}.price`}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Input
                        type="number"
                        value={value || 10000}
                        onChange={(e) => onChange(Number(e.target.value))}
                        required
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col items-start gap-3  col-span-6">
                  <FormLabel>추가 설명</FormLabel>
                  <Controller
                    control={control}
                    name={`optionProduct.${nestIndex}.selectProducts.${k}.description`}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Input
                        type="text"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        required
                      />
                    )}
                  />
                </div>

                {/* <div className="flex flex-col items-start gap-3  col-span-1">
                  <FormLabel>상품 진행 설명</FormLabel>
                  <Controller
                    control={control}
                    name={`optionProduct.${nestIndex}.selectProducts.${k}.howto`}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Textarea
                        rows={10}
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="resize-none"
                      />
                    )}
                  />
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
