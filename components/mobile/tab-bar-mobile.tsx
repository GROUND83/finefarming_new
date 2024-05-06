"use client";
import Link from "next/link";
import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
  MagnifyingGlassCircleIcon as SolidMagnifyingGlassCircleIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  MagnifyingGlassCircleIcon as OutLineMagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen grid grid-cols-5 border-neutral-300 border-t px-5 py-3 ">
      <Link href={"/"} className="flex flex-col items-center gap-px">
        {pathname === "/" ? (
          <OutlineHomeIcon className="w-7 h-7" />
        ) : (
          <SolidHomeIcon className="w-7 h-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href={"/find"} className="flex flex-col items-center gap-px">
        {pathname === "/" ? (
          <OutLineMagnifyingGlassCircleIcon className="w-7 h-7" />
        ) : (
          <SolidMagnifyingGlassCircleIcon className="w-7 h-7" />
        )}
        <span>FIND</span>
      </Link>
      <Link href={"/journal"} className="flex flex-col items-center gap-px">
        <SolidNewspaperIcon className="w-7 h-7" />
        <span>JOURNAL</span>
      </Link>
      <Link href={"/board"} className="flex flex-col items-center gap-px">
        <SolidHomeIcon className="w-7 h-7" />
        <span>BOARD</span>
      </Link>
      <Link href={"/profile"} className="flex flex-col items-center gap-px">
        <SolidUserIcon className="w-7 h-7" />
        <span>Mypage</span>
      </Link>
    </div>
  );
}
