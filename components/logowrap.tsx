import Link from "next/link";
import Logo from "../public/logocolor.svg";
export default function LogoWrap() {
  return (
    <Link href={"/"} className=" relative w-[70px] h-[40px] ">
      <Logo />
    </Link>
  );
}
