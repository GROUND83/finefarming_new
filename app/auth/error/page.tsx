import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <p>이미 다른 로그인 방식으로 계정을 생성하였습니다.</p>
      <Button
        asChild
        className="mt-6
      "
      >
        <Link href={"/"}>홈으로 가기</Link>
      </Button>
    </div>
  );
}
