"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCategoryItems from "@/components/ProductCategoryItems";
import { fetchCategories } from "@/utils/requests";
import Spinner from "@/components/Spinner";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const category = params.category;

  const categoryId = category.split("-").pop();

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

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className=" flex flex-col items-center my-6 md:items-start md:mr-6">
      <div className="flex p-4 text-gray-700 text-2xl font-bold border-b-2 border-blue-500 mb-6">
        {pageTitle}
      </div>
      <ProductCategoryItems key={categoryId} categoryId={categoryId} />
    </div>
  );
};

export default CategoryPage;
