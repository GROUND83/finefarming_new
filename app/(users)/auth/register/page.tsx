"use client";
import FormButton from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LENGHT } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function Auth() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <main className=" w-full grid grid-cols-2 gap-1 h-screen">
      <div className="flex flex-col items-center gap-6 col-span-2 p-6 justify-center">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logocolor.svg" alt="logo" width={90} height={100} />
          <p>파인파밍에 어서오세요!</p>
        </div>
        <form className="flex flex-col gap-3 w-full" action={action}>
          <Input
            type="text"
            placeholder="이메일"
            name="email"
            required
            errors={state?.fieldErrors.email}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            errors={state?.fieldErrors.password}
            minLength={PASSWORD_MIN_LENGHT}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            required
            errors={state?.fieldErrors.confirmPassword}
            minLength={PASSWORD_MIN_LENGHT}
          />
          <FormButton text="회원가입" />
        </form>
        <SocialLogin />
        <div className="flex flex-row items-center gap-3 ">
          <span>이미 계정이 있나요?</span>
          <Link href={"/auth/login"} className="text-primary font-bold">
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
}
