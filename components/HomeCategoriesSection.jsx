"use client";
import { useState, useEffect } from "react";
import { fetchCategories, fetchProducts, fetchBrands } from "@/utils/requests";
import SpinnerH from "./SpinnerH";
import HomeCategorySection from "./HomeCategorySection";
import { HomeCategorySectionSkeleton } from "@/ui/skeletons";

const HomeCategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        const data = await fetchProducts();
        const brands = await fetchBrands();
        setCategories(categories);
        setProducts(data.totalProducts);
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
  const coffeMakerCategory = categories.find(
    (category) => category.slug === "coffee-maker",
  );

  const coffeeMakers = products.filter(
    (product) => product.sub_category === coffeMakerCategory._id,
  );

  const mainCategory = categories.find(
    (category) => category._id === coffeMakerCategory.parent,
  );

  //Finding products by their brand (ie. hisense)
  const brand = brands.find((brand) => brand.slug === "hisense");
  const hisenseProducts = products.filter(
    (product) => product.brand === brand._id,
  );

  //Finding products by their category and brand (ie. Hisense air-conditioner)
  const airConditionerCategory = categories.find(
    (category) => category.slug === "air-conditioner",
  );

  const airConditionerBrand = brands.find((brand) => brand.slug === "hisense");

  const hisenseAirConditioners = products.filter(
    (product) =>
      product.sub_category === airConditionerCategory._id &&
      product.brand === airConditionerBrand._id,
  );

  return loading ? (
    <div className="w-11/12 flex flex-col gap-12 items-center">
      {Array(5)
        .fill()
        .map((_, index) => (
          <HomeCategorySectionSkeleton key={index} />
        ))}
    </div>
  ) : (
    <div className="w-11/12 flex flex-col gap-12 items-center">
      <HomeCategorySection
        heading="جدیدترین ها"
        products={newestProducts}
        route="/products"
      />
      <HomeCategorySection
        heading="محصولات اسپرسوساز"
        products={coffeeMakers}
        route={`/products/${mainCategory.slug}/${coffeMakerCategory.slug}-${coffeMakerCategory._id}`}
      />
      <HomeCategorySection
        heading="انواع کولر گازی هایسنس"
        products={hisenseAirConditioners}
      />
      <HomeCategorySection
        heading="انواع کالاهای هایسنس"
        products={hisenseProducts}
        route={`/brands/${brand.slug}-${brand._id}`}
      />
    </div>
  );
};

export default HomeCategoriesSection;
