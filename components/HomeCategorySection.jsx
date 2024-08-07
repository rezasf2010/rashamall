"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { HomeCategorySectionSkeleton } from "@/ui/skeletons";

const HomeCategorySection = ({ heading, backgroundColor, products }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <HomeCategorySectionSkeleton />;
  }

  return (
    <section className="border border-gray-300 bg-blue-50 w-full  md:w-full p-4 rounded-2xl shadow-2xl ">
      <div className="flex p-2 mb-6 text-gray-700 text-xl font-bold border-b border-gray-300">
        {heading}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default HomeCategorySection;
