import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ImageUploadComponent({
  value,
  image,
  setValue,
  onMainImageChange,
  ref,
}: any) {
  return (
    <div className="w-full flex flex-col items-start gap-2">
      {image ? (
        <>
          <div className="w-[200px]  aspect-[4/3] relative bg-neutral-100">
            <Image
              src={image}
              priority
              alt="업체이미지"
              className=" object-cover aspect-[4/3] w-full"
              width={200}
              height={200}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-row items-center justify-end  ">
            <button
              type="button"
              onClick={() =>
                setValue(
                  "mainImage",
                  {
                    image: "",
                    uploadUrl: "",
                    file: undefined,
                    downUrl: "",
                  },
                  { shouldTouch: true, shouldDirty: true }
                )
              }
              className="text-xs  underline text-red-500  "
            >
              삭제
            </button>
          </div>
        </>
      ) : (
        <label
          htmlFor="mainImage"
          className="text-neutral-400 text-sm flex flex-col items-center gap-2 w-[200px] aspect-[4/3] justify-center border"
        >
          <PhotoIcon className="w-12" />
          <p className="text-xs">사진을 추가해주세요.</p>
        </label>
      )}

      <input
        type="file"
        ref={ref}
        accept="image/*"
        id="mainImage"
        className="hidden"
        name="mainImage"
        onChange={onMainImageChange}
      />
    </div>
  );
}
