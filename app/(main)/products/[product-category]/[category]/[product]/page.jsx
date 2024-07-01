"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import SpecificationCard from "@/components/SpecificationCard";
import { usePathname } from "next/navigation";
import { FaTimes, FaCheck } from "react-icons/fa";

const ProductPage = () => {
  const pathName = usePathname();

  // Split the pathName by '/'
  const pathParts = pathName.split("/");

  const mainCategoryId = pathParts[2];
  const subCategoryId = pathParts[3];
  const productId = pathParts[4];

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const res = await fetch(
          `/api/products/${mainCategoryId}/${subCategoryId}/${productId}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Product Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && product && (
        <div className="p-2 mt-6">
          <div className=" flex flex-col items-center border-b border-gray-400 pb-4 lg:flex-row lg:items-start">
            <div className=" flex flex-col items-center md:flex-row md:justify-between md:w-full md:gap-6 lg:w-auto lg:gap-0 ">
              <div className="w-2/3 md:w-1/2 lg:w-1/3">
                <Image
                  src={product.images[0]}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-t-xl"
                  priority={true}
                />
              </div>
              <div className=" flex-grow md:w-1/2 lg:w-2/5 py-2 px-4">
                <div className="my-2">Path section</div>
                <h1 className="text-xl font-bold mb-6 md:text-base md:font-semibold lg:text-xl lg:font-bold">
                  {product.name}
                </h1>
                <p className="mb-4 font-semibold">ویژگی ها:</p>
                <div className="flex gap-3 flex-wrap md:flex-col lg:flex-row">
                  {product.specifications.slice(0, 5).map((spec, index) => (
                    <SpecificationCard key={index} spec={spec} />
                  ))}
                </div>
              </div>
            </div>
            <div className=" px-4 py-2 flex flex-col flex-grow w-full lg:w-2/5">
              <p lang="fa" className="text-xl font-semibold mb-6">
                <span>قیمت: </span>
                {product.price.toLocaleString()} تومان
              </p>
              <div className="flex flex-col sm:flex-row justify-between lg:flex-col lg: gap-4">
                {product._stock_status === "in stock" ? (
                  <div
                    className={`flex justify-center items-center gap-6 px-4 py-2 rounded-lg font-bold text-center bg-blue-50 text-blue-500`}
                  >
                    <p>موجود</p>
                    <FaCheck className="inline-block text-blue-500" />
                  </div>
                ) : (
                  <div
                    className={`flex justify-center items-center gap-6 px-4 py-2 rounded-lg font-bold text-center bg-red-50 text-red-500`}
                  >
                    <p>ناموجود</p>
                    <FaTimes className="inline-block text-red-500" />
                  </div>
                )}
                <button className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                  افزودن به سبد خرید
                </button>
              </div>
              <p className="text-orange-500 my-6">
                لطفا برای خرید محصول با ما تماس بگیرید
              </p>
              <p className="font-semibold">(پرداخت درب منزل برای شهر تهران)</p>
            </div>
          </div>
          <section className="my-6 ">
            <div className="border-b border-gray-400 mb-4 p-4">
              <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
                معرفی
              </h3>
              <p>{product.description}</p>
            </div>

            <div className="border-b border-gray-400 mb-4 p-4">
              <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
                مشخصات
              </h3>
              <ul>
                {product.specifications.map((spec, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-bold">{spec.key}: </span>
                    {spec.value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-gray-400 mb-4 p-4">
              <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
                امکانات
              </h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-gray-400 mb-4 p-4">
              <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
                خدمات
              </h3>
              <ul>
                {product.services.map((service, index) => (
                  <li key={index} className="mb-2">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-gray-400 mb-4 p-4">
              <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
                نظرات
              </h3>
              <div>comments section</div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProductPage;
