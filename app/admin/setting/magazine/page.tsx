"use client";
import { FormTitle } from "../../_component/form/form";

import { getMagazines, updateMagazineOrder } from "./_actions/actions";
import Image from "next/image";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function Page() {
  const [magazines, setProduct] = React.useState<any>([]);
  const getMagazine = async () => {
    const result = await getMagazines();
    console.log("result", result);
    setProduct(result);
  };
  const changeValue = async ({
    value,
    magazineId,
  }: {
    value: any;
    magazineId: any;
  }) => {
    console.log("cyhang", value, magazineId);
    try {
      const result = await updateMagazineOrder({
        value: Number(value),
        magazineId,
      });
      console.log("result", result);
      getMagazine();
      toast.success("업데이트 성공하였습니다.");
    } catch (e: any) {
      toast.error(e);
    }
    //
  };
  React.useEffect(() => {
    getMagazine();
  }, []);
  return (
    <div className="w-full h-screen p-3">
      <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-row items-center justify-between w-full  ">
        <div className="felx flex-col items-start w-full">
          <FormTitle
            title="매거진 노출 순서"
            sub="공개 매거진 노출 순서를 관리하세요. 1순위 ~ 9순위, 나머지는 10순위로 설정하세요."
          />
        </div>
      </div>
      <div className="w-full h-full  p-3">
        <div className="w-full grid grid-cols-12 gap-3  p-3 mt-3  ">
          {magazines.length > 0 &&
            magazines.map((item: any, index: any) => {
              return (
                <section
                  key={item.id}
                  className="col-span-4  flex flex-row items-start gap-3 overflow-hidden  h-[170px] border bg-white "
                >
                  <div className="w-[170px] h-[170px] relative">
                    {item.image ? (
                      <Image
                        src={item.image}
                        fill
                        alt={item.title}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                        sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                      />
                    ) : (
                      <div className="col-span-2 h-full bg-neutral-100"></div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col items-start  justify-between p-3  h-full">
                    <div className="flex flex-col items-start  gap-2 ">
                      <p className=" font-semibold text-sm line-clamp-3">
                        {item.title}
                      </p>
                      <div className="w-full flex flex-col gap-1 ">
                        <div className="flex flex-row items-center gap-2 ">
                          <div className=" relative w-[30px] h-[30px]  rounded-full overflow-hidden">
                            <Image
                              src={item.author.avatar}
                              fill
                              alt={item.title}
                              style={{
                                objectFit: "cover",
                                objectPosition: "center center",
                              }}
                              sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                            />
                          </div>
                          <p className="text-sm ">{item.author.username}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start  gap-2 w-full ">
                      <Select
                        onValueChange={(value) =>
                          changeValue({ value, magazineId: item.id })
                        }
                        defaultValue={item.order.toString()}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="우선순위를 설정하세요." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="9">9</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </section>
              );
            })}
        </div>
      </div>
    </div>
  );
}
