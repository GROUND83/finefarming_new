"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound } from "next/navigation";

import { getUploadUrl } from "@/lib/uploadUrl";
import { Form, FormField } from "@/components/ui/form";
import { toast } from "sonner";
import {
  newFarmImageSchema,
  newFarmImageSchemaType,
} from "./_components/newFarmImageSchema";
import { farmImageUpload, getFarmImages } from "./_components/actions";
import ImageUploadComponent from "@/app/admin/_component/imageUploadComponent";
import {
  FormFooter,
  FormTitle,
  FormWrap,
} from "@/app/admin/_component/form/form";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";

export default function Page({ params }: { params: { id: string } }) {
  //
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);

  const form = useForm<newFarmImageSchemaType>({
    resolver: zodResolver(newFarmImageSchema),
    defaultValues: {
      mainImage: { image: "", uploadUrl: "", file: "", downUrl: "" },
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState,
  } = form;
  //
  const onSubmit = handleSubmit(async (data: newFarmImageSchemaType) => {
    // 업로드 이미지
    console.log("data", data);

    if (!data.mainImage.image) {
      toast.error("메인이미지가 없습니다.");
      return;
    }

    setUpdateLoading(true);
    console.log("etdata", data);
    if (!formState.isDirty) {
      const mainImageUpload = new FormData();
      mainImageUpload.append("file", data.mainImage.file);
      // 시잔 업로드
      const response = await fetch(data.mainImage.uploadUrl, {
        method: "POST",
        body: mainImageUpload,
      });
      if (response.status !== 200) {
        return;
      }

      const formData = new FormData();

      formData.append("id", params.id);
      formData.append("mainImage", `${data.mainImage.downUrl}/public`);

      try {
        const result = await farmImageUpload(formData);
      } catch (e: any) {
        // console.log(e);
      } finally {
        setUpdateLoading(false);
        // window.location.reload();
      }
    } else {
      // 수정
      const formData = new FormData();
      console.log(formState.dirtyFields);
      if (data.mainImage.file) {
        //
        console.log("file", data.mainImage.file);
        const mainImageUpload = new FormData();
        mainImageUpload.append("file", data.mainImage.file);
        // 시잔 업로드
        const response = await fetch(data.mainImage.uploadUrl, {
          method: "POST",
          body: mainImageUpload,
        });
        if (response.status !== 200) {
          return;
        }
        formData.append("mainImage", `${data.mainImage.downUrl}/public`);
      } else {
        formData.append("mainImage", data.mainImage.image);
      }
      formData.append("id", params.id);

      try {
        const result = await farmImageUpload(formData);
      } catch (e: any) {
        console.log(e);
        toast.error(e);
      } finally {
        setUpdateLoading(false);
      }
    }
  });
  const onValid = async () => {
    await onSubmit();
  };

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
    if (file.size > 2000000) {
      alert("이미지 사이즈가 2mb를 초과 하였습니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    console.log(url);

    const { success, result } = await getUploadUrl();
    console.log(result);
    if (success) {
      const { id, uploadURL } = result;

      setValue(
        "mainImage",
        {
          image: url,
          uploadUrl: uploadURL,
          downUrl: `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}`,
          file: file,
        },
        { shouldDirty: true }
      );
    }
  };

  const reload = async () => {
    setLoading(true);
    const id = Number(params.id);
    if (isNaN(id)) {
      notFound();
    }
    let data = await getFarmImages(id);
    if (!data) {
      notFound();
    }

    reset({
      mainImage: {
        image: data.mainImage ?? "",
        uploadUrl: data.mainImage ?? "",
        downUrl: data.mainImage ?? "",
        file: "",
      },
    });
    setLoading(false);
  };
  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log(
        "form.formState.isSubmitSuccessful",
        form.formState.isSubmitSuccessful
      );
      toast.success("데이터 수정이 완료 되었습니다.");
      reload();
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
        <div className="w-full  flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6  "
                action={onValid}
              >
                <FormWrap>
                  <FormTitle title="대표사진" sub="농장 대표사진" />

                  <div className="col-span-9 grid grid-cols-2 gap-6 ">
                    <div className="col-span-2 ">
                      <FormField
                        control={control}
                        name="mainImage"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => {
                          let images = getValues("mainImage.image");
                          // console.log("images", images);
                          return (
                            <ImageUploadComponent
                              image={images}
                              setValue={setValue}
                              onMainImageChange={onMainImageChange}
                            />
                          );
                        }}
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
