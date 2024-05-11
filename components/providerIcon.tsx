import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function ProviderIcon({ value }: { value: string }) {
  return (
    <div className="flex flex-row items-center gap-2">
      {value === "kakao" && (
        <div className="bg-[#FFE500] text-[#181600]  flex flex-row items-center  rounded-full  p-1 ">
          <Image alt="kakao" src={"/kakoLogo.svg"} width={10} height={10} />
        </div>
      )}
      {value === "naver" && (
        <div className="bg-[#03C75A] text-[white]  flex flex-row items-center  rounded-full  p-1 ">
          <Image alt="kakao" src={"/naverLogo.svg"} width={8} height={8} />
        </div>
      )}
      {value === "email" && (
        <div className="bg-primary text-[white]  flex flex-row items-center  rounded-full  p-1 ">
          <EnvelopeIcon className="size-[8px]" />
        </div>
      )}
    </div>
  );
}
