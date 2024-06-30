"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ProductCategoryItems from "@/components/ProductCategoryItems";

const ProductCategoryPage = () => {
  const [categoryObj, setCategoryObj] = useState({});
  const pathName = usePathname();
  const categoryId = pathName.split("-").pop();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/categories/${categoryId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setCategoryObj(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, []);

  const pageTitle = categoryObj.fa_name;

  return (
    <div className=" flex flex-col items-center my-6 md:items-start md:mr-6">
      <div className="flex pr-2 text-gray-700 font-bold mb-4">{pageTitle}</div>
      <ProductCategoryItems categoryId={categoryId} />
    </div>
  );
};

export default ProductCategoryPage;
