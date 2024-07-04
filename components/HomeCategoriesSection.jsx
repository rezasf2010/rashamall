"use client";
import { useState, useEffect } from "react";
import { fetchCategories, fetchProducts, fetchBrands } from "@/utils/requests";
import SpinnerH from "./SpinnerH";
import HomeCategorySection from "./HomeCategorySection";

const HomeCategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        const products = await fetchProducts();
        const brands = await fetchBrands();
        setCategories(categories);
        setProducts(products);
        setBrands(brands);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Finding the last 3 products that are added to the database
  const newestProducts = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  //Finding products by their category (ie. coffeMaker)
  const coffeMakerCategory = categories.filter(
    (category) => category.slug === "coffee-maker",
  );
  const coffeeMakers = products.filter(
    (product) => product.sub_category === coffeMakerCategory[0]._id,
  );

  //Finding products by their brand (ie. hisense)
  const brand = brands.filter((brand) => brand.slug === "hisense");
  const hisenseProducts = products.filter(
    (product) => product.brand === brand[0]._id,
  );

  //Finding products by their category and brand (ie. Hisense air-conditioner)
  const airConditionerCategory = categories.filter(
    (category) => category.slug === "air-conditioner",
  );

  const airConditionerBrand = brands.filter(
    (brand) => brand.slug === "hisense",
  );

  const hisenseAirConditioners = products.filter(
    (product) =>
      product.sub_category === airConditionerCategory[0]._id &&
      product.brand === airConditionerBrand[0]._id,
  );

  return loading ? (
    <SpinnerH loading={loading} />
  ) : (
    <div className="w-11/12 flex flex-col gap-12 items-center">
      <HomeCategorySection heading="جدیدترین ها" products={newestProducts} />
      <HomeCategorySection
        heading="محصولات اسپرسوساز"
        products={coffeeMakers}
      />
      <HomeCategorySection
        heading="انواع کولر گازی هایسنس"
        products={hisenseAirConditioners}
      />
      <HomeCategorySection
        heading="انواع کالاهای هایسنس"
        products={hisenseProducts}
      />
    </div>
  );
};

export default HomeCategoriesSection;
