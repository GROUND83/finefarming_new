"use client";
import { Button } from "@/components/ui/button";
import copy from "copy-to-clipboard";

//
export default function AddressCopy({ address }: { address: string }) {
  const handleCopyClipBoard = (text: string) => {
    try {
      copy(text);
      // navigator.clipboard.writeText(text);
      alert("주소가 복사되었습니다.");
    } catch (error) {
      alert("주소 복사에 실패하였습니다.");
    }
  };
  return (
    <Button
      size={"sm"}
      variant={"outline"}
      className="bg-neutral-100 px-6"
      onClick={() => handleCopyClipBoard(address)}
    >
      주소복사
    </Button>
  );
}
