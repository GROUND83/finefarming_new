import Link from "next/link";

import Image from "next/image";
export default function Auth() {
  return (
    <main className=" w-full grid grid-cols-2 gap-1 h-screen">
      <div className="col-span-1 h-full w-full ">
        <div className="w-full h-full relative   ">
          <Image
            src="/farming.png"
            alt="authIamge"
            fill={true}
            // priority={true}
            style={{
              objectPosition: "center",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 col-span-1 p-32 justify-center">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logocolor.svg" alt="logo" width={90} height={100} />
          <p>파인파밍에 어서오세요!</p>
        </div>

        <div className="flex flex-col items-center  gap-6">
          <button className="bg-[#FFE500] text-[#181600] text-md hover:bg-opacity-80 hover:bg-[#FFE500] flex flex-row items-center gap-12 rounded-md px-6 py-3 justify-between w-full">
            <Image alt="kakao" src={"/kakoLogo.svg"} width={20} height={20} />
            <p className=" ">카카오 로그인</p>
            <div className="w-[20px]"></div>
          </button>

          <button className="bg-[#03C75A] text-white text-md hover:bg-opacity-80 hover:bg-[#03C75A] flex flex-row items-center justify-between gap-12 rounded-md px-6 py-3 w-full ">
            <Image
              alt="kakao"
              src={"/naverLogo.svg"}
              width={20}
              height={20}
              className=""
            />
            <p className="">네이버 로그인</p>
            <div className="w-[20px]"></div>
          </button>
        </div>

        <div className="flex flex-row items-center gap-3 ">
          <span>이미 계정이 있나요?</span>
          <Link href={"/auth/login"} className="text-primary font-bold">
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
}
