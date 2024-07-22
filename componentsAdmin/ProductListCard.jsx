"use client";

import { useState, useEffect } from "react";
import { fetchCategories, fetchProducts } from "@/utils/requests";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const ProductListCard = ({ product }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);

        // Fetch products only if not already set
        if (products.length === 0) {
          const productsData = await fetchProducts();
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productCategory = categories.find(
    (cat) => cat._id === product.sub_category,
  );

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm("آیا از حذف این کالا اطمینان دارید؟");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/1/1/${productId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        // Remove the product from state
        const updatedProducts = products.filter(
          (product) => product._id !== productId,
        );
        setProducts(updatedProducts);

        toast.success("محصول حذف شد");
      } else {
        toast.error("مشکل در حذف محصول");
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکل در حذف محصول");
    }
  };

  return (
    <div className="text-gray-700 mb-4 flex flex-col sm:flex-row items-center gap-6 border border-gray-300 bg-gray-50 w-full mx-2 md:w-3/4 sm:w-full p-4 rounded-2xl shadow-xl">
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
          <span className="font-bold">موجودی : </span>
          {"  "}
          <div className="w-12 p-1 border border-gray-300 rounded text-center">
            {product._stock}
          </div>
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
            onClick={() => handleDeleteProduct(product._id)}
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
