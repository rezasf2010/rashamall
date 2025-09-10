'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { FaArrowLeft } from 'react-icons/fa';
import { HomeCategorySectionSkeleton } from '@/ui/skeletons';

const HomeCategorySection = ({ heading, backgroundColor, products, route }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <HomeCategorySectionSkeleton />;
  }

  return (
    <section className="border border-gray-300 bg-blue-50 w-full  md:w-full p-4 rounded-2xl shadow-2xl ">
      <div className="flex p-2 mb-6 text-gray-700 text-xl font-bold border-b border-gray-300 gap-4 items-center">
        {heading}

        {route ? (
          <Link
            href={route}
            className="flex gap-1 text-xs font-normal items-center hover:border-b hover:border-gray-500"
          >
            دیدن همه کالا ها
            <FaArrowLeft />
          </Link>
        ) : (
          ''
        )}
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
