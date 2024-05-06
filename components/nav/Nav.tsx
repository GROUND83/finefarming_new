import WithContainer from "../container/WithContainer";
import Image from "next/image";
import Link from "next/link";
//
// interface NavProps {
//   children: React.ReactNode;
//   className?: string;
// }
export default function NavBar() {
  return (
    <div className="w-full py-6 border-b-[1px]">
      <div className="container mx-auto flex flex-row items-center gap-12 justify-between">
        <div className="flex flex-row items-center gap-12">
          {/* <Image src="/logocolor.svg" alt="logo" width={90} height={100} /> */}
          <div className="flex flex-row items-center gap-12 mt-3">
            <p>어디로 떠날까요? </p>
            <p>언제 떠날까요?</p>
            <p>FIND FARM</p>
            <p>MAGAZINE</p>
            <p>BOARD</p>
          </div>
        </div>
        <div className="mt-3 flex flex-row items-center gap-3">
          <p>나의 페이지</p>
          <Link href={"/auth"}>로그인</Link>
        </div>
      </div>
    </div>
  );
}
