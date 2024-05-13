import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export default function Page() {
  return (
    <div>
      <p>매거진 작가</p>
    </div>
  );
}
