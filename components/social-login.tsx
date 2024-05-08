import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SocialLogin({ redirect }: { redirect: string }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full h-px bg-neutral-300" />
      <p className="text-sm">SNS로 시작하기</p>
      <div className="flex flex-col gap-6 w-full">
        <button
          onClick={() =>
            signIn("kakao", {
              redirect: true,
              callbackUrl: redirect ? redirect : "/",
            })
          }
          className="bg-[#FFE500] text-[#181600] text-md hover:bg-opacity-80 hover:bg-[#FFE500] flex flex-row items-center gap-12 rounded-md px-6 py-3 justify-between w-full"
        >
          <Image alt="kakao" src={"/kakoLogo.svg"} width={20} height={20} />
          <p className=" text-sm">카카오 시작하기</p>
          <div className="w-[20px]"></div>
        </button>

        <button
          onClick={() =>
            signIn("naver", {
              redirect: true,
              callbackUrl: redirect ? redirect : "/",
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
          <p className="text-sm">네이버 시작하기</p>
          <div className="w-[20px]"></div>
        </button>
      </div>
    </div>
  );
}
