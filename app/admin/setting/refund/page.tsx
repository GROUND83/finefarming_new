"use client";
import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getDefaultRefund, updateData } from "./_compoents/actions";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import { refundSchema, refundSchemaType } from "./_compoents/editSchema";

import { Switch } from "@/components/ui/switch";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
import { FormTitle, FormWrap } from "@/app/admin/_component/form/form";

export const dynamic = "force-static";
export const dynamicParams = false;

export default function Page({ params }: { params: { id: string } }) {
  const [parkingFeeAvail, setParkingFeeAvail] = useState(false);

  //

  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<refundSchemaType>({
    resolver: zodResolver(refundSchema),
    defaultValues: async () => {
      setLoading(true);
      const id = Number(params.id);
      const response = await getDefaultRefund();
      console.log("Response", response);
      setLoading(false);
      if (response) {
        return { id: response[0].id, refundPolicy: response[0].content };
      }
      return {
        refundPolicy: "",
      };
    },
  });

  const onSubmit = form.handleSubmit(async (data: refundSchemaType) => {
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
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      setUpdateLoading(false);
      window.location.reload();
    }
  });

  return (
    <div className=" w-full flex flex-col items-start h-full  flex-1  ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full   flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
            <Form {...form}>
              <form
                className="w-full grid grid-cols-12  gap-6  "
                onSubmit={onSubmit}
              >
                <div className=" col-span-3">
                  <FormTitle
                    title="취소 환불 정보"
                    sub="농장 생성시 기본으로 세팅되는 취소환불정보"
                  />
                </div>

                <div className="grid grid-cols-12 gap-6 w-full  pb-12 col-span-9">
                  <div className="col-span-12 grid grid-cols-2 gap-6 ">
                    <div className=" col-span-2">
                      <FormField
                        control={form.control}
                        name="refundPolicy"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-col items-start  space-y-0 gap-2 w-full ">
                                <div className="flex flex-row items-center gap-3 w-full">
                                  <FormControl>
                                    <Textarea
                                      rows={10}
                                      placeholder="취소 정책을 입력하세요."
                                      className="resize-none  w-full"
                                      value={field.value}
                                      onChange={field.onChange}
                                    />
                                  </FormControl>
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className=" col-span-12 flex flex-col items-end justify-end w-full mt-6 gap-3">
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
      </SubSectionWrap>
    </div>
  );
}
