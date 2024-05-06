import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full h-px bg-neutral-300" />
      <p>SNS로 로그인</p>
      <div className="flex flex-col gap-3 w-full">
        <Link
          className="bg-[#FFE500] text-[#181600] text-md hover:bg-opacity-80 hover:bg-[#FFE500] flex flex-row items-center gap-12 rounded-md px-6 py-3 justify-between w-full"
          href="/auth/kakao/start"
        >
          <Image alt="kakao" src={"/kakoLogo.svg"} width={20} height={20} />
          <p className=" ">카카오 로그인</p>
          <div className="w-[20px]"></div>
        </Link>
        <Link
          className="bg-[#03C75A] text-white text-md hover:bg-opacity-80 hover:bg-[#03C75A] flex flex-row items-center justify-between gap-12 rounded-md px-6 py-3 w-full "
          href="/auth/naver/start"
        >
          <Image
            alt="kakao"
            src={"/naverLogo.svg"}
            width={20}
            height={20}
            className=""
          />
          <p className="">네이버 로그인</p>
          <div className="w-[20px]"></div>
        </Link>
      </div>
    </div>
  );
}
