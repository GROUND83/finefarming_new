import { Button } from "@/components/ui/button";

import Link from "next/link";

export default async function Page() {
  return (
    <div className="w-full lg:container lg:mx-auto py-6 flex flex-col items-center justify-center min-h-screen gap-3">
      <p>커뮤니티 생성이 완료 되었습니다.</p>
      <p>매니저의 승인 후 커뮤니티가 게시됩니다.</p>
      <div>
        <Button asChild>
          <Link href={"/community"}>커뮤니티 바로가기</Link>
        </Button>
      </div>
    </div>
  );
}
