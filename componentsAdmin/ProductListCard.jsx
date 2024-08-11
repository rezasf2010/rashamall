"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductListCard = ({ product, categories, onDelete }) => {
  const [productCategory, setProductCategory] = useState(null);

  useEffect(() => {
    const category = categories.find((cat) => cat._id === product.sub_category);
    setProductCategory(category);
  }, [categories, product.sub_category]);

  return (
    <div className="text-gray-700 mb-4 flex flex-col sm:flex-row items-center gap-6 border border-gray-300 bg-gray-50 w-full mx-2 p-4 rounded-2xl shadow-xl">
      <Image
        src={product.images[0]}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-32 h-32 md:w-44 md:h-44 rounded-t-xl object-contain py-2 lg:py-0"
        priority={true}
      />

      <div className="info w-full">
        <div className="mb-2 ">
          <span className="font-semibold"> نام کالا :</span>
          {"  "}
          {product.name}
        </div>

        <div className="mb-2">
          <span className="font-semibold">قیمت : </span> {"  "}
          {product.price.toLocaleString()}
          {"  "}
          <span>تومان</span>
        </div>

        <div className="mb-2">
          <span className="font-semibold">گروه کالا : </span> {"  "}
          {productCategory?.fa_name}
        </div>

        <div className="flex items-center mb-2 gap-2">
          <span className="font-bold">وضعیت موجودی : </span>
          {"  "}
          {product._stock_status}
        </div>

        <div className="w-full flex gap-2 md:justify-end">
          <Link
            href={`/admin/dashboard/product-edit/${product._id}`}
            className="w-1/2 flex md:justify-end md:w-auto"
          >
            <button className="w-full md:w-auto text-sm font-semibold px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
              ویرایش جزییات
            </button>
          </Link>
          <button
            onClick={() => onDelete(product._id)}
            className="w-1/2 md:w-auto text-sm font-semibold px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
