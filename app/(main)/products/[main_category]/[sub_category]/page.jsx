"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCategoryItems from "@/components/ProductCategoryItems";
import { fetchCategories } from "@/utils/requests";
import Spinner from "@/components/Spinner";
import Breadcrumb from "@/components/Breadcrumb";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const subCategory = params.sub_category;
  const mainCategory = params.main_category;

  const subCategoryId = subCategory.split("-").pop();

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
    (category) => category._id === subCategoryId,
  );

  const mainCategoryObj = categories.filter(
    (category) => category.slug === mainCategory,
  );

  const pageTitle = categoryObj.length > 0 ? categoryObj[0].fa_name : "";

  const mainCategoryTitle =
    mainCategoryObj.length > 0 ? mainCategoryObj[0].fa_name : "";

  const mainCategoryPath =
    mainCategoryObj.length > 0
      ? `${mainCategoryObj[0].slug}-${mainCategoryObj[0]._id}`
      : "";

  const pathSegments = [
    { name: "خانه", link: "/" },
    { name: "همه کالاها", link: "/products" },
    { name: mainCategoryTitle, link: `/products/${mainCategoryPath}` },
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
      <ProductCategoryItems key={subCategoryId} categoryId={subCategoryId} />
    </div>
  );
};

export default CategoryPage;
