"use server";

import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { redirect } from "next/navigation";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  const response = await db.$transaction([
    db.monthly.count(),
    db.monthly.findMany({
      include: {
        products: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      skip: options.pageSize * options.pageIndex,
      take: options.pageSize,
      orderBy: {
        created_at: "desc", // 내림차순 최신순
      },
    }),
  ]);
  const pageCount = response[0];
  const rows = response[1];
  console.log({ pageCount, rows });
  return { pageCount, rows };
}

export async function getMonthlyData() {
  //
  let data = await db.monthly.findMany({
    include: {
      products: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return { data };
}
export async function getProductData() {
  //
  let data = await db.product.findMany({
    where: {
      status: "POSSIBLE",
    },
    select: {
      id: true,
      title: true,
    },
  });
  return { data };
}
export async function updateMonthly(formData: FormData) {
  // let images: any = formData.get("images");
  const data = {
    mainImage: formData.get("mainImage") as string,
    // images: JSON.parse(images),
    id: formData.get("id"),
  };
  console.log("data", data);
  const products = formData.get("products") as string;
  if (products) {
    const productsData = JSON.parse(products);
    let productArray = [];
    for (const product of productsData) {
      let dataProduct = await db.product.findFirst({
        where: {
          id: product.id,
        },
      });
      productArray.push(dataProduct);
    }
    let updateDatafrist = await db.monthly.update({
      where: {
        id: Number(data.id),
      },
      data: {
        image: data.mainImage,
        updated_at: getDateTime(),
        products: { set: [] },
      },
      include: {
        products: true,
      },
    });
    let updateData = await db.monthly.update({
      where: {
        id: Number(data.id),
      },
      data: {
        image: data.mainImage,
        updated_at: getDateTime(),
        products: {
          connect: productsData,
        },
      },
      include: {
        products: true,
      },
    });
    return { data: updateData };
  } else {
    // const productsData = JSON.parse(products);
    let updateData = await db.monthly.update({
      where: {
        id: Number(data.id),
      },
      data: {
        image: data.mainImage,

        updated_at: getDateTime(),
      },
    });
    return { data: updateData };
  }
}
