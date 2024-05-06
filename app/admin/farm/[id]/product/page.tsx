"use client";
import React from "react";

import NewProductModal from "./_component/newProductModla";

import { ProductDataTable } from "./_component/ProductTableData";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className=" w-full flex flex-col items-start h-full  flex-1  ">
      <div className="w-full   flex-1 flex p-3">
        <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
          <div className="flex flex-row items-center justify-between w-full">
            <p>상품리스트</p>
            <NewProductModal farmId={params.id} />
          </div>
          <ProductDataTable farmId={params.id} />
        </div>
      </div>
    </div>
  );
}
