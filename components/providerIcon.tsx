import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import KakaoIcon from "../public/kakoLogo.svg";
import NaverIcon from "../public/naverLogo.svg";
export default function ProviderIcon({ value }: { value: string }) {
  return (
    <div className="flex flex-row items-center gap-2">
      {value === "kakao" && (
        <div className="bg-[#FFE500] text-[#181600]  flex flex-row items-center  justify-center rounded-full  w-[18px] h-[18px] ">
          <KakaoIcon height={10} width={10} />
        </div>
      )}
      {value === "naver" && (
        <div className="bg-[#03C75A] text-[white]  flex flex-row items-center  justify-center rounded-full  w-[18px] h-[18px] ">
          <NaverIcon height={7} width={7} />
        </div>
      )}
      {value === "email" && (
        <div className="bg-primary text-[white]   flex flex-row items-center  justify-center rounded-full  w-[18px] h-[18px] ">
          <EnvelopeIcon className="size-[8px]" />
        </div>
      )}
    </div>
  );
}
