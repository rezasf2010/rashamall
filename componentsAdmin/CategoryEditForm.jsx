"use client";

import { useState, useEffect } from "react";
import { fetchCategories, fetchCategory } from "@/utils/requests";
import { useRouter, useParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const CategoryEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [fields, setFields] = useState({
    type: "main", // Assume type is "main" by default, update based on fetched data if needed
    mainCategoryName: "",
    subCategoryName: "",
    subCategoryNameEn: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await fetchCategory(id);
        const categories = await fetchCategories();

        setFields({
          type: category.parent ? "sub" : "main",
          mainCategoryName: category.parent || "",
          subCategoryName: category.fa_name,
          subCategoryNameEn: category.name,
        });

        setCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.status === 200) {
        toast.success("دسته بندی با موفقیت به روز رسانی شد");
        router.push("/admin/dashboard/category-list");
      } else {
        toast.error("مشکل در بروزرسانی دسته بندی");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("مشکل در بروزرسانی دسته بندی");
    }
  };

  if (loading) return <Spinner loading={loading} />;

  return (
    <section className="w-full">
      <div className="w-11/12 m-auto">
        <div className="bg-white px-3 md:px-6 py-8 mb-4 shadow-md rounded-md border">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl md:text-3xl text-center font-semibold mb-6">
              ویرایش دسته بندی
            </h2>

            <div className="mb-4 flex justify-around">
              <label className="flex items-center gap-2 text-gray-700 font-bold mb-2">
                <input
                  type="radio"
                  name="type"
                  value="main"
                  checked={fields.type === "main"}
                  onChange={handleChange}
                />
                دسته اصلی
              </label>
              <label className="flex items-center gap-2 text-gray-700 font-bold mb-2">
                <input
                  type="radio"
                  name="type"
                  value="sub"
                  checked={fields.type === "sub"}
                  onChange={handleChange}
                />
                دسته فرعی
              </label>
            </div>

            {fields.type === "sub" && (
              <div className="mb-4">
                <label
                  htmlFor="mainCategoryName"
                  className="flex pr-2 text-gray-700 font-bold mb-2"
                >
                  گروه اصلی
                </label>
                <select
                  id="mainCategoryName"
                  name="mainCategoryName"
                  className="border border-gray-300 rounded w-full py-2 px-3 drop-down"
                  value={fields.mainCategoryName}
                  onChange={handleChange}
                >
                  <option value="">گروه اصلی را انتخاب کنید</option>
                  {categories
                    .filter((category) => category.parent === null)
                    .map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.fa_name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="subCategoryName"
                className="flex pr-2 text-gray-700 font-bold mb-2"
              >
                نام دسته بندی فرعی
              </label>
              <input
                type="text"
                id="subCategoryName"
                name="subCategoryName"
                className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
                placeholder="نام دسته بندی فرعی"
                required
                value={fields.subCategoryName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="subCategoryNameEn"
                className="flex pr-2 gap-2 text-gray-700 font-bold mb-2"
              >
                نام دسته بندی فرعی {"  "}
                <span className="text-blue-500 font-semibold">(English)</span>
              </label>
              <input
                type="text"
                id="subCategoryNameEn"
                name="subCategoryNameEn"
                className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
                style={{ direction: "ltr" }}
                placeholder="نام دسته بندی فرعی (English)"
                required
                value={fields.subCategoryNameEn}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                به روز رسانی دسته بندی
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CategoryEditForm;
