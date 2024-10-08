import ImageSelector from "@/app/admin/_component/imageSelector";
import { FormField } from "@/components/ui/form";
import { getUploadUrl } from "@/lib/uploadUrl";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useFieldArray } from "react-hook-form";

type nestedProps = {
  nestIndex: any;
  control: any;
  setValue: any;
  wholeImage: any;
  form: any;
};
export const NestedImage = ({
  nestIndex,
  control,
  setValue,
  wholeImage,
  form,
}: nestedProps) => {
  //
  const { fields, remove, append } = useFieldArray({
    control,
    name: `sections.${nestIndex}.images`,
  });

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
              key={k}
              control={control}
              name={`sections.${nestIndex}.images.${k}.image`}
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <div
                    className={`${
                      fields.length > 2 && k === 0
                        ? " col-span-2 aspect-square relative"
                        : fields.length > 2 && k === 0
                        ? " col-span-1 aspect-square relative"
                        : fields.length > 1 && k === 0
                        ? " col-span-1 aspect-square relative"
                        : fields.length > 1 && k !== 0
                        ? " col-span-1 aspect-square relative"
                        : fields.length === 1 && k !== 0
                        ? " col-span-2 aspect-[4/3] relative"
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
                          <label className=" text-sm flex flex-row items-center gap-2   p-2 cursor-pointer">
                            <ImageSelector
                              wholeImage={wholeImage}
                              form={form}
                              value={value}
                              onChange={(value: any) => {
                                console.log("value", value);

                                form.setValue(
                                  `sections.${nestIndex}.images.${k}.image`,
                                  value,
                                  {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                  }
                                );
                              }}
                            />
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
