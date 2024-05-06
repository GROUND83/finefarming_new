"use client";

import SubTop from "@/components/subTop";
import DefaultLayOut from "../_component/defaultLayOut";

export default function LayOut({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayOut
      title="업체 관리"
      sub=" 등록된 업체를 조회하고 상품을 관리할 수 있습니다."
      searchbutton={true}
      newbutton={true}
      url="farm"
    >
      {children}
    </DefaultLayOut>
  );
}
