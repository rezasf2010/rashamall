"use client";

import { useState, useEffect } from "react";
import { fetchCategories } from "@/utils/requests";
import CategoryListCard from "@/componentsAdmin/CategoryListCard";
import { CategoryListCardSkeleton } from "@/ui/skeletons";
import { toast } from "react-toastify";

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm("آیا از حذف این دسته بندی اطمینان دارید؟");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId),
        );
        toast.success("دسته بندی با موفقیت حذف شد");
      } else {
        toast.error("مشکل در حذف دسته بندی");
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکل در حذف دسته بندی");
    }
  };

  return (
    <div className=" w-full gap-4 flex flex-col items-center">
      <div className="w-11/12 m-1 md:m-auto">
        <div className="bg-white min-h-3/4 flex flex-col items-center px-2 sm:px-4 py-4 md:px-6 mb-4 shadow-md rounded-md border">
          <h2 className="text-lg md:text-3xl text-center font-semibold mb-6">
            لیست دسته بندی کالاها
          </h2>
          {loading
            ? Array(5)
                .fill()
                .map((_, index) => <CategoryListCardSkeleton key={index} />)
            : categories.map((category) => (
                <CategoryListCard
                  key={category._id}
                  category={category}
                  categories={categories}
                  onDelete={handleDeleteCategory}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryListPage;
