"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCategoryItems from "@/components/ProductCategoryItems";
import Spinner from "@/components/Spinner";

const CategoryPage = () => {
  const [categoryObj, setCategoryObj] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const category = params.category;

  const categoryId = category.split("-").pop();

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
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const pageTitle = categoryObj.fa_name;

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
