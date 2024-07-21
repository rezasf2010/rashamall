"use client";
import { useState, useEffect } from "react";
import { fetchCategories } from "@/utils/requests";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CategoryAddFrom = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState("");
  const [mounted, setMounted] = useState(true);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");

  const initialCategoryData = {
    categoryType: "",
    mainCategoryName: "",
    mainCategoryNameEn: "",
    subCategoryName: "",
    subCategoryNameEn: "",
  };

  const [categoryData, setCategoryData] = useState(initialCategoryData);

  const handleCategoryChange = (e) => {
    setCategoryType(e.target.value);
    setCategoryData({ ...categoryData, categoryType: e.target.value });
  };

  const handleMainCategoryChange = (e) => {
    setSelectedMainCategory(e.target.value);
    setCategoryData({ ...categoryData, mainCategoryName: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const mainCategories = categories
    .filter((category) => category.parent === null)
    .sort((a, b) => a._id.localeCompare(b._id));

  useEffect(() => {
    if (categoryType === "subCategory") {
      setCategoryData((prevCategoryData) => ({
        ...prevCategoryData,
        mainCategoryNameEn: "",
      }));
    }
  }, [categoryType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
        encType: "multipart/form-data",
      });

      if (res.status === 200) {
        toast.success("دسته بندی با موفقیت افزوده شد");
        setCategoryType("");
        setCategoryData(initialCategoryData);
        setSelectedMainCategory("");
        router.push(`/admin/dashboard/category-add`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error("Permission denied");
      } else {
        toast.error("مشکل در افزودن دسته بندی");
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکل در افزودن دسته بندی");
    }
  };

  return (
    mounted && (
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg md:text-3xl text-center font-semibold mb-6">
          افزودن دسته بندی جدید
        </h2>

        <div className="my-4 py-4 px-8 border border-gray-300 shadow-xl bg-gray-100 rounded-xl">
          <div className="mt-4 ">
            <h2 className="text-sm md:text-xl font-bold mb-4 ">
              نوع دسته بندی را انتخاب نمایید
            </h2>
          </div>

          <div className="flex justify-around items-center">
            <div className="my-2">
              <label className="text-gray-700 flex gap-3 items-center">
                <input
                  type="radio"
                  name="categoryType"
                  value="mainCategory"
                  checked={categoryType === "mainCategory"}
                  onChange={handleCategoryChange}
                />
                <span className="ml-2 text-sm md:text-base">دسته اصلی </span>
              </label>
            </div>
            <div className="my-2">
              <label className="text-gray-700 flex gap-3 items-center">
                <input
                  type="radio"
                  name="categoryType"
                  value="subCategory"
                  checked={categoryType === "subCategory"}
                  onChange={handleCategoryChange}
                />
                <span className="ml-2 text-sm md:text-base">دسته فرعی</span>
              </label>
            </div>
          </div>

          {categoryType === "mainCategory" && (
            <div>
              <div className="my-4">
                <label
                  htmlFor="mainCategoryName"
                  className="block text-gray-700 font-bold px-3 text-sm md:text-base"
                >
                  نام دسته بندی اصلی
                </label>
                <input
                  type="text"
                  id="mainCategoryName"
                  name="mainCategoryName"
                  className="mt-1 block w-full p-2 border rounded"
                  value={categoryData.mainCategoryName || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="mainCategoryNameEn"
                  className="block text-gray-700 font-bold px-3 text-sm md:text-base"
                >
                  نام دسته بندی اصلی{" "}
                  <span className="text-blue-500 font-semibold">(English)</span>
                </label>
                <input
                  type="text"
                  id="mainCategoryNameEn"
                  name="mainCategoryNameEn"
                  className="mt-1 block w-full p-2 border rounded text-end"
                  value={categoryData.mainCategoryNameEn || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {categoryType === "subCategory" && (
            <div className="my-4">
              <div className="mb-4">
                <label
                  htmlFor="mainCategoryName"
                  className="flex  pr-2 text-gray-700 font-bold mb-2 text-sm md:text-base"
                >
                  دسته اصلی
                </label>
                <select
                  id="mainCategoryName"
                  name="mainCategoryName"
                  className="border border-gray-300 rounded w-full py-2 px-3 drop-down"
                  required
                  value={selectedMainCategory}
                  onChange={handleMainCategoryChange}
                >
                  <option value="" disabled>
                    گروه اصلی را انتخاب کنید
                  </option>
                  {mainCategories.map((MainCategory) => (
                    <option key={MainCategory._id} value={MainCategory._id}>
                      {MainCategory.fa_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="my-4">
                <label
                  htmlFor="subCategoryName"
                  className="block text-gray-700 font-bold px-3 text-sm md:text-base"
                >
                  نام دسته بندی فرعی
                </label>
                <input
                  type="text"
                  id="subCategoryName"
                  name="subCategoryName"
                  className="mt-1 block w-full p-2 border rounded"
                  value={categoryData.subCategoryName || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="my-4">
                <label
                  htmlFor="subCategoryNameEn"
                  className="block text-gray-700 font-bold px-3 text-sm md:text-base"
                >
                  نام دسته بندی فرعی{" "}
                  <span className="text-blue-500 font-semibold">(English)</span>
                </label>
                <input
                  type="text"
                  id="subCategoryNameEn"
                  name="subCategoryNameEn"
                  className="mt-1 block w-full p-2 border rounded text-end"
                  value={categoryData.subCategoryNameEn || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {categoryData.categoryType && (
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                افزودن دسته بندی
              </button>
            </div>
          )}
        </div>
      </form>
    )
  );
};

export default CategoryAddFrom;
