"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LayOut({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-start flex-1 p-3">
      {children}
    </div>
  );
}
