"use client";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { MinusIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function ImagesArray({
  form,
  index,
  field,
  imagesForm,
}: //   onOtherImageChange,
{
  form: any;
  index: any;
  field: any;
  imagesForm: any;
  //   onOtherImageChange: any;
}) {
  const [urldata, setUrlData] = React.useState<any>();
  const onOtherImageChange = async (
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
    if (file.size > 50000000) {
      toast.warning("이미지 사이즈가 50mb를 초과 하였습니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    console.log(url);
    setUrlData(url);
    let key = `images.${event.target.alt}`;
    let getvalue = form.getValues("images");
    console.log(getvalue, key, event.target.name);
    form.setValue(
      key,
      {
        image: url,
        uploadUrl: "",
        downUrl: "",
        file: file,
      },
      { shouldDirty: true }
    );
    // const { success, result } = await getUploadUrl();
    // console.log(result);
    // if (success) {
    //   const { id, uploadURL } = result;
    //   // upload?
    //   const mainImageUpload = new FormData();
    //   mainImageUpload.append("file", file);
    //   // 시잔 업로드
    //   const response = await fetch(uploadURL, {
    //     method: "POST",
    //     body: mainImageUpload,
    //   });
    //   if (response.status !== 200) {
    //     return;
    //   }
    //   let key = `images.${event.target.alt}`;

    //   form.setValue(
    //     key as any,
    //     {
    //       image: url,
    //       uploadUrl: uploadURL,
    //       downUrl: `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}/public`,
    //     },
    //     { shouldValidate: true }
    //   );
    // }
  };
  return (
    <div className="flex flex-col items-start gap-2 relative  col-span-2">
      <label
        htmlFor={field.id}
        className=" aspect-square  flex flex-col items-center justify-center  bg-center cursor-pointer bg-cover w-full border "
        style={{
          backgroundImage: `url(${form.getValues(`images.[${index}].image`)})`,
        }}
      >
        {form.getValues(`images.[${index}].image`) === "" ? (
          <div className="text-neutral-400 text-sm flex flex-col items-center gap-2 w-full justify-center">
            <PhotoIcon className="w-6" />
            <p className="text-xs">사진을 추가해주세요.</p>
          </div>
        ) : null}
      </label>
      <div className="flex flex-row items-center justify-end w-full absolute top-0 right-0">
        <button
          type="button"
          onClick={() => imagesForm.remove(index)}
          className="text-xs   border rounded-full bg-red-500/80 hover:bg-red-500/50 transition-colors  w-5 h-5 flex flex-col items-center justify-center border-red-500 "
        >
          <MinusIcon className="size-3 text-white" />
        </button>
      </div>
      <input
        alt={index.toString()}
        id={field.id}
        type="file"
        accept="image/*"
        className="hidden"
        name={`images.${index}`}
        onChange={onOtherImageChange}
        key={field.id}
      />
    </div>
  );
}
