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
    orderBy: {
      id: "asc",
    },
  });
  return { data };
}
export async function getProductData() {
  //
  let data = await db.product.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return { data };
}
export async function updateMonthly(formData: string) {
  // let images: any = formData.get("images");
  let datas = JSON.parse(formData);
  // const data = {
  //   mainImage: formData.get("mainImage") as string,
  //   // images: JSON.parse(images),
  //   id: formData.get("id"),
  // };
  console.log("datas", datas);
  for (const data of datas.data) {
    const products = data.products;

    // const productsData = JSON.parse(products);
    if (data.month) {
      if (products.length > 0) {
        // const productsData = JSON.parse(products);
        let productArray = [];

        let updateDatafrist = await db.monthly.update({
          where: {
            id: Number(data.id),
          },
          data: {
            updated_at: getDateTime(),
            products: { set: [] },
          },
        });
        let updateData = await db.monthly.update({
          where: {
            id: Number(data.id),
          },
          data: {
            updated_at: getDateTime(),
            products: products,
          },
        });
        console.log("updateData", updateData);
      } else {
        let updateDatafrist = await db.monthly.update({
          where: {
            id: Number(data.id),
          },
          data: {
            updated_at: getDateTime(),
            products: { set: [] },
          },
        });
      }
      let updateData = await db.monthly.update({
        where: {
          id: Number(data.id),
        },
        data: {
          image: data.newImage,
          updated_at: getDateTime(),
        },
      });
    } else {
      let createData = await db.monthly.create({
        data: {
          month: data.month,
          image: data.newImage,
          updated_at: getDateTime(),
        },
      });
      if (products.length > 0) {
        // const productsData = JSON.parse(products);
        let updateDatafrist = await db.monthly.update({
          where: {
            id: Number(createData.id),
          },
          data: {
            updated_at: getDateTime(),
            products: { set: [] },
          },
        });
        let productArray = [];
        for (const product of products) {
          let dataProduct = await db.product.findUnique({
            where: {
              id: product.id,
            },
          });
          if (dataProduct) {
            productArray.push(dataProduct);
          }
        }
        if (productArray.length > 0) {
          let updateData = await db.monthly.update({
            where: {
              id: Number(data.id),
            },
            data: {
              updated_at: getDateTime(),
              products: products,
            },
          });
        }
      } else {
        let updateDatafrist = await db.monthly.update({
          where: {
            id: Number(createData.id),
          },
          data: {
            updated_at: getDateTime(),
            products: { set: [] },
          },
        });
      }
    }
  }
  return { data: JSON.stringify(datas) };
}
