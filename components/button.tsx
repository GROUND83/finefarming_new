"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  // form 하위에서만 사용가능
  // interactive 이나까 use client
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-300 disabled:text-neutral-600 disabled:cursor-not-allowed flex flex-col items-center justify-center "
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : text}
    </button>
  );
}
