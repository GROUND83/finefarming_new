"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getFacilityInitData, updateData } from "./_compoents/actions";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import { editSchema, editSchemaType } from "./_compoents/editSchema";
import {
  FormFooter,
  FormTitle,
  FormWrap,
} from "@/app/admin/_component/form/form";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
import Link from "next/link";

type facilitiesData = {
  id: number;
  title: string;
};
export default function Page({ params }: { params: { id: string } }) {
  const [facilitiesData, setFacilitiesData] = useState<facilitiesData[]>([]);
  const [farmItemData, setFarmItemsData] = useState<facilitiesData[]>([]);
  const [parkingFeeAvail, setParkingFeeAvail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      id: undefined,
      farmItems: [],
      parking: "",
      parkinngFee: "",
      facilities: [],
      pet: false,
    },
  });

  const onSubmit = form.handleSubmit(async (data: editSchemaType) => {
    // 업로드 이미지
    console.log("etdata", data);
    // if (!file) {
    //   return;
    // }
    setUpdateLoading(true);

    // console.log("data.approve", data.approve, typeof data.approve);
    let newData = JSON.stringify(data);
    const formData = new FormData();
    formData.append("newData", newData);
    try {
      const result = await updateData(formData);
      if (result) {
        toast({
          duration: 3000,
          title: "수정완료",
          description: "데이터 수정이 완료 되었습니다.",
        });
      }
    } catch (e: any) {
      console.log(e);
      toast({
        duration: 3000,
        variant: "destructive",
        title: "수정 ERROR",
        description: `${e}`,
      });
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUpdateLoading(false);
      window.location.reload();
    }
  });

  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log(value, name, type);
      if (value.parking) {
        if (value.parking === "paid") {
          setParkingFeeAvail(false);
        } else {
          setParkingFeeAvail(true);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  //
  const reload = async () => {
    setLoading(true);
    const id = Number(params.id);
    if (isNaN(id)) {
      notFound();
    }
    let data = await getFacilityInitData(id);
    if (!data) {
      notFound();
    }
    if (data.facility.length > 0) {
      setFacilitiesData(data.facility);
    }
    if (data.farmItem.length > 0) {
      setFarmItemsData(data.farmItem);
    }
    form.reset({
      id: data?.farm?.id ?? "",
      farmItems: data?.farm?.farmItems ?? "",
      parking: data?.farm?.parking ?? "",
      parkinngFee: data?.farm?.parkinngFee ?? "",
      facilities: data?.farm?.facilities ?? "",
      pet: data?.farm?.pet ?? "",
    });
    setLoading(false);
  };
  //
  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log(
        "form.formState.isSubmitSuccessful",
        form.formState.isSubmitSuccessful
      );
      toast({
        duration: 3000,
        title: "수정완료",
        description: "데이터 수정이 완료 되었습니다.",
      });
      reload();
      console.log("done");
      // window.location.reload();
    }
  }, [form.formState.isSubmitSuccessful]);
  //
  React.useEffect(() => {
    reload();
  }, []);
  //
  return (
    <div className=" w-full flex    flex-1 ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full   flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6  "
                onSubmit={onSubmit}
              >
                <FormWrap>
                  <FormTitle title="체험 정보" sub="" />

                  <div className="col-span-9 grid grid-cols-2 gap-6 ">
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="farmItems"
                        render={() => (
                          <FormItem className="w-full ">
                            <div className="flex flex-col gap-1">
                              <div className="flex flex-row items-center gap-3">
                                <FormLabel className="">체험 품종</FormLabel>
                                <Link
                                  href="/admin/setting/farmitem"
                                  className="text-primary text-sm underline flex flex-row items-center gap-1 "
                                >
                                  품종관리 <ArrowUpRight className="size-4" />
                                </Link>
                              </div>
                              <FormDescription className="">
                                농장에서 제공되는 체험품종을 선택하세요.
                              </FormDescription>
                            </div>
                            <div className="flex flex-row items-center gap-6 w-full">
                              {farmItemData.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="farmItems"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            className="size-4 rounded-none"
                                            checked={field.value?.includes(
                                              item.title
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    item.title,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.title
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="">
                                          {item.title}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </FormWrap>
                <FormWrap>
                  <FormTitle title="시설 정보" sub="" />

                  <div className="col-span-9 grid grid-cols-2 gap-6 ">
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="parking"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel className="">주차시설</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={onChange}
                                defaultValue={value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex flex-row items-center gap-6">
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value="free"
                                        checked={value === "free"}
                                      />
                                    </FormControl>
                                    <FormLabel className="">무료</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value="paid"
                                        checked={value === "paid"}
                                      />
                                    </FormControl>
                                    <FormLabel className="">유료</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value="noPark"
                                        checked={value === "noPark"}
                                      />
                                    </FormControl>
                                    <FormLabel className="">불가</FormLabel>
                                  </FormItem>
                                </div>
                              </RadioGroup>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="parkinngFee"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel className="">주차요금</FormLabel>
                            <FormControl>
                              <Textarea
                                disabled={parkingFeeAvail}
                                placeholder="주차요금을 입력하세요."
                                className="resize-none "
                                value={value || ""}
                                onChange={onChange}
                                required={!parkingFeeAvail}
                              />
                            </FormControl>
                            <FormDescription className=" flex flex-row items-center gap-1">
                              <ExclamationCircleIcon className="size-4" />
                              10분당/시간당/일 등 주차 요금 정보를 입력해주세요.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2 ">
                      <div className="flex flex-col w-full">
                        <FormField
                          control={form.control}
                          name="facilities"
                          render={() => (
                            <FormItem className="w-full flex flex-col gap-2">
                              <div className="flex flex-row gap-3 items-center">
                                <FormLabel className="">구비시설</FormLabel>
                                <Link
                                  href="/admin/setting/farmitem"
                                  className="text-primary text-sm underline flex flex-row items-center gap-1 "
                                >
                                  구비시설 관리
                                  <ArrowUpRight className="size-4" />
                                </Link>
                              </div>
                              <div className="grid grid-cols-12 gap-6">
                                {facilitiesData.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="facilities"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className=" col-span-4 flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              className="size-4 rounded-none"
                                              checked={field.value?.includes(
                                                item.title
                                              )}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([
                                                      ...field.value,
                                                      item.title,
                                                    ])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) =>
                                                          value !== item.title
                                                      )
                                                    );
                                              }}
                                            />
                                          </FormControl>

                                          <FormLabel className="">
                                            {item.title}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="pet"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col items-start gap-3 space-y-0">
                            <FormLabel>변려동물</FormLabel>

                            <div className="flex flex-row items-center gap-3">
                              <FormControl>
                                <Checkbox
                                  className="size-4 rounded-none"
                                  checked={value}
                                  onCheckedChange={onChange}
                                />
                              </FormControl>
                              <FormDescription className=" text-black">
                                {value ? "동반 가능" : "동반 불가"}
                              </FormDescription>
                            </div>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </FormWrap>
                <FormFooter>
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
