import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { getUploadUrl } from "@/lib/uploadUrl";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useFieldArray } from "react-hook-form";

type nestedProps = {
  nestIndex: any;
  control: any;
  setValue: any;
};
export const NestedImage = ({ nestIndex, control, setValue }: nestedProps) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `sections.${nestIndex}.images`,
  });
  const onMainImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.id, event.target.name);
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    console.log(file);
    // if (file.size > 2000000) {
    //   alert("이미지 사이즈가 2mb를 초과 하였습니다.");
    //   return;
    // }

    const url = URL.createObjectURL(file);
    console.log(url);

    const { success, result } = await getUploadUrl();
    console.log(result);
    if (success) {
      const { id, uploadURL } = result;

      //
      setValue(
        event.target.name,
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
  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-end py-1  px-6 ">
        <button
          type="button"
          disabled={fields.length > 2}
          onClick={() =>
            append({
              image: "",
              uploadUrl: "",
              downUrl: "",
              file: "",
            })
          }
          className="flex flex-row items-center text-sm"
        >
          <PlusIcon className="size-3" />
          이미지
        </button>
      </div>

      <div className={`w-full grid grid-cols-2  gap-2 `}>
        {fields.map((item, k) => {
          console.log("fields", fields.length, k);
          return (
            <FormField
              key={item.id}
              control={control}
              name={`sections.${nestIndex}.images.${k}.image`}
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <div
                    className={`${
                      fields.length === 3 && k === 0
                        ? " col-span-1 aspect-square relative"
                        : fields.length === 3 && k === 1
                        ? " col-span-1 aspect-square relative"
                        : fields.length === 2 && k === 0
                        ? " col-span-1 aspect-square relative"
                        : fields.length === 2 && k !== 0
                        ? " col-span-1 aspect-square relative"
                        : fields.length === 1 && k !== 0
                        ? " col-span-1 aspect-[4/3] relative"
                        : fields.length === 1 && k === 0
                        ? " col-span-2  aspect-square relative"
                        : " col-span-2  aspect-square relative"
                    } relative border`}
                  >
                    {value && (
                      <Image
                        src={value}
                        alt="농장이미지"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    <div className="  flex flex-col items-center justify-center w-full h-full">
                      {!value ? (
                        <div>
                          <label
                            htmlFor={`sections.${nestIndex}.images.${k}`}
                            className=" text-sm flex flex-row items-center gap-2   p-2 cursor-pointer"
                          >
                            <PlusIcon className="w-4" />
                            <p className="text-xs">사진을 추가해주세요.</p>
                          </label>
                          <button
                            type="button"
                            onClick={() => remove(k)}
                            className="text-xs   bg-red-500 text-white  absolute bottom-2 right-2  px-2 "
                          >
                            삭제
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => remove(k)}
                          className="text-xs   bg-red-500 text-white  absolute bottom-2 right-2  px-2 "
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      id={`sections.${nestIndex}.images.${k}`}
                      className="hidden"
                      name={`sections.${nestIndex}.images.${k}`}
                      onChange={onMainImageChange}
                    />
                  </div>
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
