"use client";

import { useState, useEffect } from "react";
import { fetchCategories } from "@/utils/requests";
import Image from "next/image";
import Link from "next/link";

const ProductListCard = ({ product }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const productCategory = categories.find(
    (cat) => cat._id === product.sub_category,
  );

  return (
    <div className="text-gray-700 mb-4 flex items-center gap-6 border border-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
      <Link href={`/products/1/1/${product._id}`} className="image">
        <Image
          src={product.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 h-32 md:w-44 md:h-44 rounded-t-xl object-contain py-2 lg:py-0"
          priority={true}
        />
      </Link>
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
          <span className="font-bold">موجودی : </span>
          {"  "}
          <div className="w-12 p-1 border border-gray-300 rounded text-center">
            {product._stock}
          </div>
        </div>

        <div className="w-full">
          <Link
            href={`/admin/edit-product/${product._id}`}
            className="w-full flex md:justify-end md:w-auto"
          >
            <button className="w-full md:w-auto text-sm font-semibold px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
              ویرایش جزییات
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
