"use server";

import dayjs from "dayjs";

export async function getUploadUrl() {
  //
  let now = dayjs();
  let expiry = now.add(1, "hour").toISOString();
  // let dataJson = JSON.stringify({
  //   expiry: expiry,
  // });
  console.log("expiry", expiry);
  let formdata = new FormData();
  formdata.append("expiry", expiry);
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
    }
  );
  const result = await response.json();
  console.log(result);
  return result;
}
