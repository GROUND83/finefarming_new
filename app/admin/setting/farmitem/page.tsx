"use client";
import React from "react";
import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import { Loader2, MinusIcon } from "lucide-react";
import Link from "next/link";
import { editFarmItems, getFarmItems } from "./actions";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { farmItemsSchem, farmItemsSchemType } from "./farmItemSchema";
import { Input } from "@/components/ui/input";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import { useToast } from "@/components/ui/use-toast";
import { FormTitle } from "../../_component/form/form";

export default function Page() {
  const [farmItems, setFarmItems] = React.useState<any[]>([]);
  const [content, setContent] = React.useState("");
  const [updateloading, setUpdateLoading] = React.useState(false);
  const { toast } = useToast();
  const getFarmItemsdata = async () => {
    //
    let result: any = await getFarmItems();
    console.log(result);
    setFarmItems(result);
    // if (result.length > 0) {
    //   setRefundData(result[0]);
    //   setContent(result[0].content);
    // }
  };
  const clickUpdate = async () => {
    //
    // console.log("content", content, refundData);
    // if (refundData) {
    //   //
    //   let formData = new FormData();
    //   formData.append("id", refundData.id);
    //   formData.append("content", content);
    //   let result = await updateBaseServicePolicy(formData);
    // } else {
    //   let result = await createBaseServicePolicy(content);
    // }
  };

  React.useEffect(() => {
    getFarmItemsdata();
  }, []);

  const form = useForm<farmItemsSchemType>({
    resolver: zodResolver(farmItemsSchem),
    defaultValues: {},
  });
  const farmItemsForm = useFieldArray({
    control: form.control,
    name: "farmItems",
  });
  const facilityForm = useFieldArray({
    control: form.control,
    name: "facility",
  });
  const toolsForm = useFieldArray({
    control: form.control,
    name: "tools",
  });
  const onSubmit = form.handleSubmit(async (data) => {
    console.log("data", data);
    setUpdateLoading(true);
    try {
      let newStringFy = JSON.stringify(data);
      let result = await editFarmItems(newStringFy);
      // toast({
      //   duration: 3000,
      //   title: "수정완료",
      //   description: "데이터 수정이 완료 되었습니다.",
      // });
    } catch (e) {
      //
      toast({
        duration: 3000,
        variant: "destructive",
        title: "수정 ERROR",
        description: `${e}`,
      });
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUpdateLoading(false);
    }
  });
  //
  const reload = async () => {
    const response = await getFarmItems();
    console.log("response", response);

    form.reset({
      farmItems: response.farmItems,
      facility: response.facility,
      tools: response.tools,
    });
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
    // console.log("params.productid", params.productid);
    reload();
  }, []);
  return (
    <div className="w-full h-screen p-3">
      <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
        <form
          className="w-full flex flex-col items-start gap-6 text-sm "
          onSubmit={onSubmit}
        >
          <div className=" grid grid-cols-12 gap-3 w-full flex-1 border-b pb-12">
            <div className="flex flex-col items-start gap-3  col-span-3">
              <div className="felx flex-col items-start w-full">
                <FormTitle title="체험품종" sub=" 체험 품종을 관리하세요." />
              </div>
              <Button
                type="button"
                className="flex flex-row items-center gap-2"
                variant={"outline"}
                size={"sm"}
                onClick={() =>
                  farmItemsForm.append({
                    title: "",
                  })
                }
              >
                <PlusIcon className="size-4" />
                채험 품종 추가
              </Button>
            </div>
            <div className="  col-span-9 grid grid-cols-12 gap-3">
              {farmItemsForm.fields.map((field, index) => {
                return (
                  <div
                    className="  col-span-3 grid grid-cols-12 gap-1 0"
                    key={index}
                  >
                    <Controller
                      control={form.control}
                      name={`farmItems.${index}.title`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div className=" flex flex-row items-center gap-2 col-span-12 ">
                          <Input
                            value={value}
                            onChange={onChange}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant={"outline"}
                            onClick={() => farmItemsForm.remove(index)}
                          >
                            <MinusIcon className="size-4" />
                          </Button>
                        </div>
                      )}
                    />
                  </div>
                );
              })}
            </div>
            {/*  */}
          </div>
          <div className=" grid grid-cols-12 gap-3 w-full flex-1 border-b pb-12">
            <div className="flex flex-col items-start gap-3  col-span-3">
              <div className="felx flex-col items-start w-full">
                <FormTitle title="구비시설" sub="구비시설을 관리하세요." />
              </div>
              <Button
                type="button"
                className="flex flex-row items-center gap-2"
                variant={"outline"}
                size={"sm"}
                onClick={() =>
                  facilityForm.append({
                    title: "",
                  })
                }
              >
                <PlusIcon className="size-4" />
                구비시설 추가
              </Button>
            </div>
            <div className="  col-span-9 grid grid-cols-12 gap-3">
              {facilityForm.fields.map((field, index) => {
                return (
                  <div
                    className="  col-span-3 grid grid-cols-12 gap-1 0"
                    key={index}
                  >
                    <Controller
                      control={form.control}
                      name={`facility.${index}.title`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div className=" flex flex-row items-center gap-2 col-span-12 ">
                          <Input
                            value={value}
                            onChange={onChange}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant={"outline"}
                            onClick={() => facilityForm.remove(index)}
                          >
                            <MinusIcon className="size-4" />
                          </Button>
                        </div>
                      )}
                    />
                  </div>
                );
              })}
            </div>
            {/*  */}
          </div>
          <div className=" grid grid-cols-12 gap-3 w-full flex-1 border-b pb-12">
            <div className="flex flex-col items-start gap-3  col-span-3">
              <div className="felx flex-col items-start w-full">
                <FormTitle title="도구 복장" sub="도구 복장을 관리하세요." />
              </div>
              <Button
                type="button"
                className="flex flex-row items-center gap-2"
                variant={"outline"}
                size={"sm"}
                onClick={() =>
                  toolsForm.append({
                    title: "",
                  })
                }
              >
                <PlusIcon className="size-4" />
                도구 복장 추가
              </Button>
            </div>
            <div className="  col-span-9 grid grid-cols-12 gap-3">
              {toolsForm.fields.map((field, index) => {
                return (
                  <div
                    className="  col-span-3 grid grid-cols-12 gap-1 0"
                    key={index}
                  >
                    <Controller
                      control={form.control}
                      name={`tools.${index}.title`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div className=" flex flex-row items-center gap-2 col-span-12 ">
                          <Input
                            value={value}
                            onChange={onChange}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant={"outline"}
                            onClick={() => toolsForm.remove(index)}
                          >
                            <MinusIcon className="size-4" />
                          </Button>
                        </div>
                      )}
                    />
                  </div>
                );
              })}
            </div>
            {/*  */}
          </div>
          <div className="flex flex-col items-end w-full">
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
        <div className="flex flex-col items-start justify-center    w-full flex-1"></div>
      </div>
    </div>
  );
}
