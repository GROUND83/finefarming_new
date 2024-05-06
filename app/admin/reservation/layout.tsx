"use client";
import DefaultLayOut from "../_component/defaultLayOut";

export default function LayOut({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayOut
      title="예약 관리"
      sub="예약건을 조회하고 관리할 수 있습니다."
      newbutton={true}
      searchbutton={true}
      url="reservation"
    >
      <div className=" flex flex-col items-start w-full  ">{children}</div>
    </DefaultLayOut>
  );
}
