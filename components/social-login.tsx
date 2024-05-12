import { signIn } from "next-auth/react";
import Image from "next/image";
import KakaoIcon from "../public/kakoLogo.svg";
import NaverIcon from "../public/naverLogo.svg";
export default function SocialLogin({ redirect }: { redirect: string }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          onClick={() =>
            signIn("kakao", {
              redirect: true,
              callbackUrl: redirect ? redirect : "/",
            })
          }
          className=" col-span-1 bg-[#FFE500] text-[#181600] text-md hover:bg-opacity-80 hover:bg-[#FFE500] flex flex-row items-center gap-3 rounded-md py-3 justify-center "
        >
          <KakaoIcon height={20} width={20} />
          <p className=" text-sm">카카오 시작하기</p>
        </button>

        <button
          onClick={() =>
            signIn("naver", {
              redirect: true,
              callbackUrl: redirect ? redirect : "/",
            })
          }
          className="col-span-1 bg-[#03C75A] text-white text-md hover:bg-opacity-80 hover:bg-[#03C75A] flex flex-row items-center justify-center  gap-3 rounded-md  py-3  "
        >
          <NaverIcon height={18} width={18} />
          <p className="text-sm">네이버 시작하기</p>
        </button>
      </div>
    </div>
  );
}
