'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import Breadcrumb from '@/components/Breadcrumb';

const SavedProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const res = await fetch('/api/bookmarks');

        if (res.status === 200) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.log(res.statusText);
          toast.error('failed to fetch saved products');
        }
      } catch (error) {
        console.error('failed to fetch saved products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProducts();
  }, []);

  const pathSegments = [{ name: 'خانه', link: '/' }, { name: 'کالاهای ذخیره شده' }];

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="w-full flex flex-col my-6 pr-6">
      <div className="flex flex-col items-start">
        <Breadcrumb pathSegments={pathSegments} />
        <div className="flex p-2 md:p-4 text-gray-700 text-lg md:text-2xl font-bold border-b-2 border-blue-500 mb-6">
          کالا های ذخیره شده
        </div>
      </div>
      {products.length === 0 ? (
        <p> کالایی یافت نشد! </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProductsPage;
