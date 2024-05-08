import { NumberInput } from "@/components/form/NumberInput";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

export const SelectProductField = ({
  nestIndex,
  control,
  setvalue,
  form,
}: {
  nestIndex: number;
  control: any;
  setvalue: any;
  form: any;
}) => {
  const { fields } = useFieldArray({
    control,
    name: `subProduct.${nestIndex}.selectProducts`,
  });

  return (
    <div className="w-full flex flex-col items-start gap-3  ">
      <p className="text-lg font-semibold">선택 옵션</p>
      {fields.map((item: any, k) => {
        return (
          <div
            key={k}
            className="border p-3 rounded-md  w-full flex flex-row items-center gap-2 "
          >
            <Controller
              control={form.control}
              name={`subProduct.${nestIndex}.selectProducts.${k}.amount`}
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <div className="flex flex-row items-center w-full   flex-wrap">
                    <div className="flex flex-col items-start gap-2 flex-1">
                      <p className=" line-clamp-1">{item.title || ""}</p>
                      <p className="text-neutral-500">
                        {Number(item.price).toLocaleString()}원
                      </p>
                    </div>
                    <div className="flex-1 flex flex-col items-end">
                      <NumberInput
                        min={0}
                        max={99}
                        name={`subProduct.${nestIndex}.selectProducts.${k}.amount`}
                        onChange={onChange}
                        value={value || 0}
                        setvalue={setvalue}
                      />
                    </div>
                  </div>
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
