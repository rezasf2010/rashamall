'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import ProductCard from '@/components/ProductCard';
import Spinner from '@/components/Spinner';
import Breadcrumb from '@/components/Breadcrumb';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`/api/products/search?query=${query}`);

        if (res.status === 200) {
          const data = await res.json();
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const pathSegments = [
    { name: 'خانه', link: '/' },
    { name: 'همه کالاها', link: '/products' },
  ];

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="py-6 px-12 w-full">
      <div className="flex flex-col items-start mb-6">
        <Breadcrumb pathSegments={pathSegments} />
        <div className="flex p-2 md:p-4 text-gray-700 text-lg md:text-2xl font-bold border-b-2 border-blue-500">
          نتیجه جستجو
        </div>
      </div>
      {products.length === 0 ? (
        <p> کالایی یافت نشد! </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResultsPage;
