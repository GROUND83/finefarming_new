"use server";
import db from "@/lib/db";

import { redirect } from "next/navigation";
import { productNewSchema } from "./newSchema";
import { type Prisma } from "@prisma/client";
import getDateTime from "@/lib/getDateTime";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
  farmId: number;
}) {
  //
  // console.log(options.pageIndex);
  const response = await db.$transaction([
    db.product.count({ where: { farmId: options.farmId } }),
    db.product.findMany({
      where: {
        farmId: options.farmId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        visible: true,
        created_at: true,
        farmId: true,
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
  console.log("row", rows);
  console.log({ pageCount, rows });
  return { pageCount, rows, farmId: options.farmId };
}

export async function getProductsData(id: number) {
  const farmer = await db.farm.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      products: {
        select: {
          id: true,
          title: true,
          description: true,
        },
      },
    },
  });
  if (farmer) {
    return farmer;
  } else {
    redirect("/not-found");
  }
}

export async function productCreateData(formData: FormData) {
  return new Promise(async (resolve, reject) => {
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
    };
    console.log("data", data);
    const farmId = Number(formData.get("id"));
    const result = await productNewSchema.safeParseAsync(data);
    console.log(result);
    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    } else {
      try {
        let product = await db.product.create({
          data: {
            farm: { connect: { id: farmId } },
            title: result.data.title,
            description: result.data.description,
            created_at: getDateTime(),
            updated_at: getDateTime(),
          },
        });

        // let response = await db.farm.update({
        //   where: {
        //     id: Number(data.id),
        //   },
        //   data: {
        //     name: result.data.name,
        //     visible: result.data.visible,
        //     initail: result.data.initail,
        //     companyNumber: result.data.companyNumber,
        //     address: result.data.address,
        //     mainPhone: result.data.mainPhone,
        //     resevationManager: result.data.resevationManager,
        //     resevationPhone: result.data.resevationPhone,
        //     owner: { connect: { id: Number(result.data.farmerId) } },
        //   },
        // });
        console.log("response", product);
        return resolve(product);
      } catch (e: any) {
        console.log(e);
      }
    }
  });
}

export async function farmListData() {
  const farm = await db.farm.findMany({
    where: {
      visible: true,
    },
    select: {
      id: true,
      name: true,
    },
  });
  if (farm) {
    return farm;
  } else {
    redirect("/not-found");
  }
}

// export async function deleteData(formData: FormData) {
//   return new Promise(async (resolve, reject) => {
//     const data = {
//       id: Number(formData.get("id")),
//     };
//     console.log("data", data);
//     const result = await deleteSchema.safeParseAsync(data);
//     console.log(result);
//     if (!result.success) {
//       console.log(result.error.flatten());
//       return result.error.flatten();
//     } else {
//       if (data.id) {
//         try {
//           let response = await db.farmer.delete({
//             where: {
//               id: Number(data.id),
//             },
//           });
//           console.log("response", response);
//           return resolve(response);
//         } catch (e) {
//           if (e) {
//             return reject(e);
//           }
//         }
//       }
//     }
//   });
// }
