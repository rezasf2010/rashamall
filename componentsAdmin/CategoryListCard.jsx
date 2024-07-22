"use Client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CategoryListCard = ({ category, categories, onDelete }) => {
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    if (category.parent) {
      const parentCat = categories.find((cat) => cat._id === category.parent);
      setParentCategory(parentCat);
    }
  }, []);

  return (
    <div
      className={`text-gray-700 mb-4 flex flex-col md:flex-row items-center md:items-end gap-6 border border-gray-300 w-full p-4 rounded-2xl shadow-xl ${
        category.parent === null ? "bg-green-50" : "bg-gray-50"
      }`}
    >
      <div className="info w-full">
        <div className="mb-2">
          <span className="font-semibold">نام دسته بندی: </span>
          {category.fa_name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">نام انگلیسی دسته بندی: </span>
          {category.name}
        </div>
        {category.parent && (
          <div className="mb-2">
            <span className="font-semibold">دسته بندی اصلی: </span>
            {parentCategory.fa_name}
          </div>
        )}
        <div className="w-full flex gap-2 md:justify-end">
          <Link
            href={`/admin/dashboard/category-edit/${category._id}`}
            className="w-1/2 flex md:justify-end md:w-auto"
          >
            <button className="w-full md:w-auto text-sm font-semibold px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
              ویرایش
            </button>
          </Link>
          <button
            onClick={() => onDelete(category._id)}
            className="w-1/2 md:w-auto text-sm font-semibold px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryListCard;
