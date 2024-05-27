import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-24 bg-neutral-100 border-t-[1px]  ">
      <div className="w-full p-12 container mx-auto">
        <div className="flex flex-col items-start gap-1">
          <Link
            href={"/personalPolicy"}
            className=" cursor-pointer text-sm text-neutral-500"
          >
            개인정보처리방침
          </Link>
          <Link
            href={"/servicePolicy"}
            className=" cursor-pointer text-sm text-neutral-500"
          >
            서비스이용 약관
          </Link>

          <p className="text-sm text-neutral-500">{`© ${new Date().getFullYear()}. FineFarming All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}
