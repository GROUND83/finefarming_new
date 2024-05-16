"use client";
import React from "react";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { notFound } from "next/navigation";

import { toast } from "sonner";
import { Form } from "@/components/ui/form";

import { optionSchema, optionSchemaType } from "./_component/optionSchema";
import Fields from "./_component/fieldArray";
import { getOptionProduct, upDateOptionProduct } from "./_component/actions";
import { FormFooter } from "@/app/admin/_component/form/form";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";

export default function Page({
  params,
}: {
  params: { id: string; productid: string };
}) {
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm<optionSchemaType>({
    resolver: zodResolver(optionSchema),
    defaultValues: { optionProduct: [] },
  });

  const onSubmit = form.handleSubmit(async (data: optionSchemaType) => {
    // 업로드 이미지
    console.log("etdata", data);
    // if (!file) {
    //   return;
    // }
    setUpdateLoading(true);
    let newData = JSON.stringify(data.optionProduct);
    // console.log("data.approve", data.approve, typeof data.approve);
    const formData = new FormData();
    formData.append("newData", newData);
    formData.append("productId", params.productid.toString());

    try {
      let result = await upDateOptionProduct(formData);
      if (result) {
        toast.success("데이터 수정이 완료 되었습니다.");
        reload();
        // toast({
        //   duration: 3000,
        //   title: "수정완료",
        //   description: "데이터 수정이 완료 되었습니다.",
        // });
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUpdateLoading(false);
      // window.location.reload();
    }
  });

  // React.useEffect(() => {
  //   if (form.formState.errors) {
  //     console.log(form.formState.errors);
  //   }
  // }, [form.formState.errors]);

  const reload = async () => {
    setLoading(true);
    const id = Number(params.productid);
    if (isNaN(id)) {
      notFound();
    }
    let data = await getOptionProduct(id);
    if (!data) {
      notFound();
    }

    form.reset({
      optionProduct: (data as any) ?? [],
    });
    setLoading(false);
  };
  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log(
        "form.formState.isSubmitSuccessful",
        form.formState.isSubmitSuccessful
      );
      // toast({
      //   duration: 3000,
      //   title: "수정완료",
      //   description: "데이터 수정이 완료 되었습니다.",
      // });
      // reload();
      console.log("done");
      // window.location.reload();
    }
  }, [form.formState.isSubmitSuccessful]);
  React.useEffect(() => {
    reload();
  }, []);
  return (
    <div className=" w-full flex    flex-1 ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full   flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6 text-sm "
                onSubmit={onSubmit}
              >
                <Fields {...form} />

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
