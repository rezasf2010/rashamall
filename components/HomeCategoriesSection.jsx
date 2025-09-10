'use client';
import { useState, useEffect, useMemo } from 'react';
import { fetchCategories, fetchProducts, fetchBrands } from '@/utils/requests';
import HomeCategorySection from './HomeCategorySection';
import { HomeCategorySectionSkeleton } from '@/ui/skeletons';

const HomeCategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [catsRes, prodsRes, brandsRes] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
          fetchBrands(),
        ]);

        // Normalize shapes to arrays
        const cats = Array.isArray(catsRes) ? catsRes : [];
        const prods = Array.isArray(prodsRes?.totalProducts)
          ? prodsRes.totalProducts
          : Array.isArray(prodsRes?.products)
            ? prodsRes.products
            : Array.isArray(prodsRes)
              ? prodsRes
              : [];
        const brs = Array.isArray(brandsRes) ? brandsRes : [];

        setCategories(cats);
        setProducts(prods);
        setBrands(brs);
      } catch (err) {
        console.error('Error fetching data:', err);
        setCategories([]);
        setProducts([]);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Safeguard inputs
  const list = Array.isArray(products) ? products : [];

  // Newest 3 products (copy before sort to avoid mutating state)
  const newestProducts = useMemo(() => {
    return [...list]
      .sort((a, b) => new Date(b?.createdAt ?? 0).getTime() - new Date(a?.createdAt ?? 0).getTime())
      .slice(0, 3);
  }, [list]);

  // Helpers to find safely
  const findCategoryBySlug = (slug) => categories.find((c) => c?.slug === slug) || null;
  const findBrandBySlug = (slug) => brands.find((b) => b?.slug === slug) || null;
  const findCategoryById = (id) => categories.find((c) => c?._id === id) || null;

  // Coffee maker
  const coffeeMakerCat = findCategoryBySlug('coffee-maker');
  const mainCategory = coffeeMakerCat ? findCategoryById(coffeeMakerCat.parent) : null;

  const coffeeMakers = useMemo(() => {
    if (!coffeeMakerCat?._id) return [];
    return list.filter((p) => p?.sub_category === coffeeMakerCat._id);
  }, [list, coffeeMakerCat]);

  // Hisense brand
  const hisense = findBrandBySlug('hisense');
  const hisenseProducts = useMemo(() => {
    if (!hisense?._id) return [];
    return list.filter((p) => p?.brand === hisense._id);
  }, [list, hisense]);

  // Hisense air conditioners
  const airConditionerCat = findCategoryBySlug('air-conditioner');
  const hisenseAirConditioners = useMemo(() => {
    if (!airConditionerCat?._id || !hisense?._id) return [];
    return list.filter(
      (p) => p?.sub_category === airConditionerCat._id && p?.brand === hisense._id,
    );
  }, [list, airConditionerCat, hisense]);

  if (loading) {
    return (
      <div className="w-11/12 flex flex-col gap-12 items-center">
        {Array.from({ length: 5 }).map((_, idx) => (
          <HomeCategorySectionSkeleton key={idx} />
        ))}
      </div>
    );
  }

  // Optional: empty state guard (so page doesn’t crash)
  if (!list.length) {
    return <div className="w-11/12 text-sm text-gray-500 py-8">محصولی برای نمایش موجود نیست.</div>;
  }

  // Build safe routes (fallbacks if slugs missing)
  const coffeeRoute =
    coffeeMakerCat?.slug && coffeeMakerCat?._id && mainCategory?.slug
      ? `/products/${mainCategory.slug}/${coffeeMakerCat.slug}-${coffeeMakerCat._id}`
      : '/products';

  const hisenseRoute =
    hisense?.slug && hisense?._id ? `/brands/${hisense.slug}-${hisense._id}` : '/brands';

  return (
    <div className="w-11/12 flex flex-col gap-12 items-center">
      <HomeCategorySection heading="جدیدترین ها" products={newestProducts} route="/products" />
      <HomeCategorySection
        heading="محصولات اسپرسوساز"
        products={coffeeMakers}
        route={coffeeRoute}
      />
      <HomeCategorySection heading="انواع کولر گازی هایسنس" products={hisenseAirConditioners} />
      <HomeCategorySection
        heading="انواع کالاهای هایسنس"
        products={hisenseProducts}
        route={hisenseRoute}
      />
    </div>
  );
};

export default HomeCategoriesSection;
