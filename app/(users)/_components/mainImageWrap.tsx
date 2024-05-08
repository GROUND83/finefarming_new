import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type props = {
  image: string;
  mainTitle: string;
  mainsub: string;
  section: string;
  link: string;
};
export default function MainImageWrap({
  image,
  mainTitle,
  mainsub,
  section,
  link,
}: props) {
  return (
    <div className="w-full grid grid-cols-2  col-span-2  container mx-auto gap-6 lg:gap-12">
      <div className="col-span-2 lg:col-span-1  ">
        <div className="w-full  aspect-square lg:aspect-[4/3] bg-cover relative">
          <Image
            src={
              "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/9184127f-ef0b-4adf-75ef-becf127cc500/public"
            }
            alt="section1"
            className="  object-cover"
            fill
            priority={true}
          />
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1  flex flex-col items-start justify-center gap-3 ">
        <div className="flex flow-row items-end gap-1  ">
          <p className="text-3xl font-semibold tracking-wide">유아</p>
          <span className=" text-lg">(4세이하)</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-center gap-2">
            <CheckCircleIcon className="size-6" />
            <p className="font-semibold">
              식물, 꽃, 열매를 이해할 수 있는 체험
            </p>
          </div>
          <p className="text-neutral-500 ml-7">
            &quot;딸기는 무슨 색일까?&quot;
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-center gap-2">
            <CheckCircleIcon className="size-6" />
            <p className="font-semibold">유아 전용 이용시간 예약 서비스 제공</p>
          </div>
          <p className="text-neutral-500 ml-7">
            부모님과 아이가 함께 즐길 수 있는 시설
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-center gap-2">
            <CheckCircleIcon className="size-6" />
            <p className="font-semibold">
              부모님과 아이가 함께 즐길 수 있는 시설
            </p>
          </div>
        </div>
        <Link
          href={"/product"}
          className="text-primary  font-semibold flex flex-row items-center gap-3"
        >
          추천농장 보기
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
