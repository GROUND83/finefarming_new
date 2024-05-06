"use client";
import FormButton from "@/components/button";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { login } from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";
import { PASSWORD_MIN_LENGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  // const onClick = async () => {
  //   const response = await fetch("/api/users", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: "nico",
  //       password: "1234",
  //     }),
  //   });
  //   console.log(await response.json());
  // };

  // 폼안에 액션

  // form 하위에서만 사용가능
  // const { pending } = useFormStatus();

  const [state, action] = useFormState(login, null);

  return (
    <main className=" w-full grid grid-cols-2 gap-1 h-screen">
      {/* <div className="col-span-1 h-full w-full ">
        <div className="w-full h-full relative   ">
          <Image
            src="/farming.png"
            alt="authIamge"
            fill={true}
            // priority={true}
            style={{
              objectPosition: "center",
              objectFit: "cover",
            }}
          />
        </div>
      </div> */}
      <div className="flex flex-col items-center gap-6 col-span-2 p-6 justify-center w-full">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logocolor.svg" alt="logo" width={90} height={100} />
          <p>파인파밍에 어서오세요!</p>
        </div>
        <form className="flex flex-col gap-3 w-full" action={action}>
          <Input
            type="email"
            name="email"
            placeholder="이메일"
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

          <Button text="로그인" />
        </form>

        <SocialLogin />
        <div className="flex flex-row items-center gap-3 ">
          <span>아직 계정이 없나요?</span>
          <Link href={"/auth/register"} className="text-primary font-bold">
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}
