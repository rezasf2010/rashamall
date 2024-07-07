"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ProductCategoryItems from "@/components/ProductCategoryItems";
import { fetchCategories } from "@/utils/requests";
import Spinner from "@/components/Spinner";
import Breadcrumb from "@/components/Breadcrumb";

const ProductCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathName = usePathname();
  const categoryId = pathName.split("-").pop();

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

  const categoryObj = categories.filter(
    (category) => category._id === categoryId,
  );

  const pageTitle = categoryObj.length > 0 ? categoryObj[0].fa_name : "";

  const pathSegments = [
    { name: "خانه", link: "/" },
    { name: "همه کالاها", link: "/products" },
    { name: pageTitle },
  ];

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="w-full flex flex-col my-6 pr-6">
      <div className="flex flex-col items-start">
        <Breadcrumb pathSegments={pathSegments} />
        <div className="flex p-2 md:p-4 text-gray-700 text-lg md:text-2xl font-bold border-b-2 border-blue-500 mb-6">
          {pageTitle}
        </div>
      </div>
      <ProductCategoryItems key={categoryId} categoryId={categoryId} />
    </div>
  );
};

export default ProductCategoryPage;
