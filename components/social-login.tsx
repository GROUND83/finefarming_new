import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full h-px bg-neutral-300" />
      <p>SNS로 시작하기</p>
      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={() =>
            signIn("kakao", {
              redirect: true,
              callbackUrl: "/",
            })
          }
          className="bg-[#FFE500] text-[#181600] text-md hover:bg-opacity-80 hover:bg-[#FFE500] flex flex-row items-center gap-12 rounded-md px-6 py-3 justify-between w-full"
        >
          <Image alt="kakao" src={"/kakoLogo.svg"} width={20} height={20} />
          <p className=" ">카카오 시작하기</p>
          <div className="w-[20px]"></div>
        </button>
        {/* <Link
          className="bg-[#FFE500] text-[#181600] text-md hover:bg-opacity-80 hover:bg-[#FFE500] flex flex-row items-center gap-12 rounded-md px-6 py-3 justify-between w-full"
          href="/auth/kakao/start"
        >
          <Image alt="kakao" src={"/kakoLogo.svg"} width={20} height={20} />
          <p className=" ">카카오 시작하기</p>
          <div className="w-[20px]"></div>
        </Link> */}
        <button
          onClick={() =>
            signIn("naver", {
              redirect: true,
              callbackUrl: "/",
            })
          }
          className="bg-[#03C75A] text-white text-md hover:bg-opacity-80 hover:bg-[#03C75A] flex flex-row items-center justify-between gap-12 rounded-md px-6 py-3 w-full "
        >
          <Image
            alt="kakao"
            src={"/naverLogo.svg"}
            width={20}
            height={20}
            className=""
          />
          <p className="">네이버 시작하기</p>
          <div className="w-[20px]"></div>
        </button>
      </div>
    </div>
  );
}
