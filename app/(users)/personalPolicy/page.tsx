import PersonalPolicyWrap from "@/components/persnalPolicyWrap";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "파인파밍의 개인정보처리방침 입니다.",
};

export default async function Page() {
  return <PersonalPolicyWrap />;
}
