import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ImageUploadComponent({
  image,
  setValue,
  onMainImageChange,
}: any) {
  return (
    <div className="w-full flex flex-col items-start gap-2">
      {image ? (
        <>
          <div className="w-[200px]  aspect-[4/3] relative bg-neutral-100">
            <Image
              src={image}
              fill
              priority
              alt="업체이미지"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    file: "",
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
          className="text-neutral-400 text-sm flex flex-col items-center gap-2 w-[200px] aspect-[4/3] justify-center"
        >
          <PhotoIcon className="w-12" />
          <p className="text-xs">사진을 추가해주세요.</p>
        </label>
      )}

      <input
        type="file"
        accept="image/*"
        id="mainImage"
        className="hidden"
        name="mainImage"
        onChange={onMainImageChange}
      />
    </div>
  );
}
