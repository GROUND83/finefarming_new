"use client";

import { createClient } from "@supabase/supabase-js";

//S3 Config

export const UploadFileClient = async ({
  folderName,
  file,
}: {
  folderName: string;
  file: File;
}) => {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const encodedName = Buffer.from(file.name).toString("base64");
    const result = await supabase.storage
      .from("finefarming")
      .upload(`/${folderName}/${encodedName}`, file, {
        upsert: true,
      });
    console.log("result", result);
    if (result.data) {
      const res = supabase.storage
        .from("finefarming")
        .getPublicUrl(result.data?.path);
      console.log("res", res);
      let url = res.data.publicUrl;
      return { location: url };
    } else {
      return {
        error: true,
      };
    }
  } catch (e) {
    return {
      error: true,
    };
  }
};
