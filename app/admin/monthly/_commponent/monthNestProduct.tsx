import React from "react";
import { useFieldArray } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
export default function MonthNextProduct({
  nestIndex,
  control,
  register,
  products,
  form,
}: {
  nestIndex: any;
  control: any;
  register: any;
  products: any;
  form: any;
}) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `data.${nestIndex}.products`,
  });
  const checkDisable = (product: any) => {
    //
    // console.log("product", product);
    let products = form.getValues(`data.${nestIndex}.products`);
    // console.log("products", products, register("products"));
    if (products) {
      let findProduct = products.find((item: any) => item.id === product.id);
      if (findProduct) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <div className="w-full">
      <div>
        <Select
          onValueChange={(value) => {
            console.log("value", JSON.parse(value));
            let valueData = JSON.parse(value);
            let findProduct = products.find(
              (item: { id: number }) => item.id === Number(valueData.id)
            );
            console.log("find", findProduct);
            return append({
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

      <div className="w-full grid grid-cols-6 gap-3  mt-3">
        {fields.map((item: any, index: any) => {
          return (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between  border p-2 col-span-3 rounded-md"
            >
              <p>{item.title}</p>
              <Button
                type="button"
                onClick={() => remove(index)}
                size={"sm"}
                variant={"outline"}
              >
                <XIcon className=" size-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
