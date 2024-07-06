"use client";
import { useState, useEffect } from "react";
import SpecAddInput from "@/componentsAdmin/SpecAddInput";
import FeaturesAddInput from "@/componentsAdmin/FeaturesAddInput";
import ServicesAddInput from "@/componentsAdmin/ServicesAddInput";
import { fetchCategories, fetchBrands } from "@/utils/requests";

const ProductAddForm = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [fields, setFields] = useState({
    name: "",
    slug: "",
    brand: "",
    main_category: "",
    sub_category: "",
    price: "",
    description: "",
    specifications: [],
    features: [],
    services: [],
    images: [],
    is_onSale: false,
    discount: "",
    _stock: "",
    _stock_status: "",
  });

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        const brands = await fetchBrands();
        setCategories(categories);
        setBrands(brands);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const mainCategories = categories
    .filter((category) => category.parent === null)
    .sort((a, b) => a._id.localeCompare(b._id));

  const subCategoriesArr = categories
    .filter((category) => category.parent)
    .sort((a, b) => a._id.localeCompare(b._id));

  function capitalizeFLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (selectedMainCategory) {
      const filteredSubCategories = subCategoriesArr.filter(
        (subCategory) => subCategory.parent === selectedMainCategory,
      );
      setSubCategories(filteredSubCategories);
    } else {
      setSubCategories([]);
    }
  }, [selectedMainCategory]);

  const handleMainCategoryChange = (e) => {
    setSelectedMainCategory(e.target.value);
    setFields({ ...fields, main_category: e.target.value });
  };

  const handleSubCategoryChange = (e) => {
    setFields({ ...fields, sub_category: e.target.value });
  };

  const handleBrandChange = (e) => {
    setFields({ ...fields, brand: e.target.value });
  };

  const handleOnSaleChange = (e) => {
    const { checked } = e.target;

    setFields((prevFields) => ({
      ...prevFields,
      is_onSale: checked,
      discount: checked ? fields.discount : "", // Clear discount if not on sale
    }));
  };

  const handleStockChange = (e) => {
    const value = e.target.value;
    const stockStatus = value > 0 ? "in stock" : "out of stock";
    setFields({ ...fields, _stock: value, _stock_status: stockStatus });
  };

  const handleStockStatusChange = (e) => {
    setFields({ ...fields, _stock_status: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if nested property
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");

      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      // Not nested
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleSpecificationsChange = (specifications) => {
    setFields({ ...fields, specifications });
  };

  const handleImageChange = (e) => {
    const { files } = e.target;

    // Clone image array
    const updatedImages = [...fields.images];

    // Add new files to the array
    for (const file of files) {
      updatedImages.push(file);
    }

    //Upadte state with arraye of images
    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  return (
    mounted && (
      <form action="/api/products" method="POST" encType="multipart/form-data">
        <h2 className="text-3xl text-center font-semibold mb-6">
          افزودن محصول جدید
        </h2>

        <div className="mb-4">
          <label
            htmlFor="mainCategory"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
            گروه اصلی
          </label>
          <select
            id="mainCategory"
            name="mainCategory"
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

        <div className="mb-4">
          <label
            htmlFor="subCategory"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
            گروه فرعی
          </label>
          <select
            id="subCategory"
            name="subCategory"
            className="border border-gray-300 rounded w-full py-2 px-3 drop-down"
            required
            value={fields.sub_category}
            onChange={handleSubCategoryChange}
            disabled={!selectedMainCategory}
          >
            <option value="" disabled>
              گروه فرعی را انتخاب کنید
            </option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.fa_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="brand"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
            برند
          </label>
          <select
            id="brand"
            name="brand"
            className="border border-gray-300 rounded w-full py-2 px-3 drop-down"
            required
            value={fields.brand}
            onChange={handleBrandChange}
            disabled={!selectedMainCategory}
          >
            <option value="" disabled>
              برند را انتخاب کنید
            </option>
            {brands
              .sort((a, b) => a._id.localeCompare(b._id))
              .map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {capitalizeFLetter(brand.name)}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
            نام محصول
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
            placeholder="مثال: ماشین لباسشویی مدل "
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="flex pr-2 text-gray-700 font-bold mb-2"
          >
            قیمت (تومان)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="border border-gray-300 rounded w-full py-2 px-3 mb-2 text-end"
            placeholder="1,200,000"
            required
            min="0"
            value={fields.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 ">
          <label
            htmlFor="description"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
            توضیحات
          </label>
          <textarea
            id="description"
            name="description"
            className="border border-gray-300 rounded w-full py-2 px-3 resize-none"
            rows="4"
            placeholder="توضیحات تکمیلی در مورد محصول"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <SpecAddInput
          specifications={fields.specifications}
          setSpecifications={handleSpecificationsChange}
        />

        <FeaturesAddInput
          features={fields.features}
          setFeatures={(features) => setFields({ ...fields, features })}
        />

        <ServicesAddInput
          services={fields.services}
          setServices={(services) => setFields({ ...fields, services })}
        />

        <div className="mb-4 flex items-center gap-2">
          <label
            htmlFor="is_onSale"
            className="flex pr-2 text-gray-700 font-bold"
          >
            تخفیف دارد
          </label>
          <input
            type="checkbox"
            id="is_onSale"
            name="is_onSale"
            value={fields.is_onSale}
            className="mr-2 transform scale-150"
            checked={fields.is_onSale}
            onChange={handleOnSaleChange}
          />
        </div>

        {fields.is_onSale && (
          <div className="mb-4">
            <label
              htmlFor="discount"
              className="flex pr-2 text-gray-700 font-bold mb-2"
            >
              درصد تخفیف
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
              placeholder="مثال: 10"
              min="0"
              max="100"
              value={fields.discount}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="flex pr-2 text-gray-700 font-bold mb-2"
          >
            موجودی
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="border border-gray-300 rounded w-full py-2 px-3 mb-2 "
            placeholder="مثال: 12"
            required
            value={fields._stock}
            onChange={handleStockChange}
            min="0"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="_stock_status"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
            وضعیت موجودی
          </label>
          <select
            id="_stock_status"
            name="_stock_status"
            className="border border-gray-300 rounded w-full py-2 px-3 drop-down "
            required
            value={fields._stock_status}
            onChange={handleStockStatusChange}
          >
            <option value="in stock">موجود</option>
            <option value="out of stock">نا موجود</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="images"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
            عکس محصول (حداکثر 4 عکس)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="border border-gray-300 rounded w-full py-2 px-4 drop-down"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            افزودن محصول
          </button>
        </div>
      </form>
    )
  );
};

export default ProductAddForm;
