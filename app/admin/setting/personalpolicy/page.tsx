"use client";
import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  createBasePersonalPolicy,
  getPersonalPolicy,
  updateBasePersonalPolicy,
} from "./actions";
import QuillEditor from "../../_component/QuillEditer";
import { FormTitle } from "../../_component/form/form";

export default function Page() {
  const [refundData, setRefundData] = React.useState<any>();
  const [content, setContent] = React.useState("");
  const [updateloading, setUpdateLoading] = React.useState(false);

  const getRefunPolicydata = async () => {
    //
    let result: any = await getPersonalPolicy();
    console.log(result);
    if (result.length > 0) {
      setRefundData(result[0]);
      setContent(result[0].content);
    }
  };
  const clickUpdate = async () => {
    //
    console.log("content", content, refundData);
    if (refundData) {
      //
      let formData = new FormData();
      formData.append("id", refundData.id);
      formData.append("content", content);
      let result = await updateBasePersonalPolicy(formData);
    } else {
      let result = await createBasePersonalPolicy(content);
    }
  };

  React.useEffect(() => {
    getRefunPolicydata();
  }, []);
  return (
    <div className="w-full p-3">
      <div className="w-full  grid grid-cols-12 gap-3  bg-white p-6 rounded-md border ">
        <div className="flex flex-col items-start gap-1 col-span-3">
          <FormTitle title="개인정보처리방침" sub="" />

          <p className="text-neutral-500 text-sm flex flex-row items-center gap-1">
            사이트 개인정보 처리방침 입니다.
          </p>
          <Link
            href="/admin/policy"
            className=" underline text-primary text-sm"
          >
            미리보기
          </Link>
        </div>
        <div className="flex flex-col items-start justify-center    col-span-9">
          <QuillEditor content={content} setContent={setContent} />
        </div>
        <div className="self-end mt-24 col-span-12 flex flex-col items-end">
          <Button
            onClick={() => clickUpdate()}
            // disabled={!formState.isDirty}
          >
            {updateloading ? (
              <Loader2 className=" animate-spin size-4" />
            ) : (
              <span>수정</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
