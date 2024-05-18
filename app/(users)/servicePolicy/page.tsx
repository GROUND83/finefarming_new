import ServicePolicy from "@/components/servicePolicyWrap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스이용약관",
  description: "파인파밍의 서비스이용약관 입니다.",
};

export default async function Page() {
  return <ServicePolicy />;
}
