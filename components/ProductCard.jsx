"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCardSkeleton } from "@/ui/skeletons";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(true);

  const discountedPrice = product.is_onSale
    ? Math.ceil(product.price - (product.price * product.discount) / 100)
    : Math.ceil(product.price);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="bg-gray-50 w-44 min-h-80 p-2 md:w-80 md:h-[28rem] lg:h-[28rem] lg:w-72 hxlg:w-80 2xl:w-96 rounded-xl shadow-2xl relative border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="w-full h-auto md:h-2/3 flex rounded-t-xl justify-center items-center">
          <Image
            src={product.images[0]}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto md:w-full md:h-full rounded-t-xl object-contain py-2 lg:py-0"
            priority={true}
          />
        </div>
        {product.is_onSale && (
          <div className="absolute top-2 left-0 bg-red-500 text-white px-2 md:px-4 py-1 rounded-tr-xl rounded-br-xl text-xs md:text-base md:font-bold">
            SALE
          </div>
        )}
        <div
          className={`absolute top-[10px] right-[10px] flex justify-center items-center px-2 md:px-4 py-2 rounded-lg text-xs md:text-base md:font-bold text-center bg-${
            product._stock_status === "in stock"
              ? "blue-50 text-blue-500"
              : "red-50 text-red-500"
          }`}
        >
          <p>{product._stock_status === "in stock" ? "موجود" : "ناموجود"}</p>
        </div>
        <div className="relative px-4 py-2 flex flex-col md:h-1/3">
          <h3 className="text-xs mb-2 font-[600] md:text-sm lg:text-base">
            {product.name}
          </h3>
          <div className="text-end text-xs md:text-sm font-[500] text-green-900 mb-4">
            {product.is_onSale ? (
              <div className="flex flex-col">
                <span className="line-through text-green-900">
                  {Math.ceil(product.price).toLocaleString()} تومان
                </span>
                <span className="text-red-400">
                  {discountedPrice.toLocaleString()} تومان
                </span>
              </div>
            ) : (
              product.price.toLocaleString() + " تومان"
            )}
          </div>
        </div>
      </div>
      <div className="md:absolute md:bottom-3 flex flex-col lg:flex-row justify-between">
        <Link
          href={`/products/${product.main_category}/${product.sub_category}/${product._id}`}
          className="h-6 md:h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 md:py-2 rounded-lg text-center text-xs md:text-sm"
        >
          جزییات محصول
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
