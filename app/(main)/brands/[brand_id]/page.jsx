'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Spinner from '@/components/Spinner';
import Breadcrumb from '@/components/Breadcrumb';
import Pagination from '@/components/pagination';
import ProductCard from '@/components/ProductCard';

const BrandNamePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalItems, setTotalItems] = useState(0);

  const brandId = params.brand_id;

  const [brandName, brandObjectId] = brandId.split('-');

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const res = await fetch(`/api/brands/${brandObjectId}?page=${page}&pageSize=${pageSize}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setProducts(data.products);
        setTotalItems(data.total);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [page, pageSize]);

  const pathSegments = [
    { name: 'خانه', link: '/' },
    { name: 'همه کالاها', link: '/products' },
    { name: brandName },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="w-full flex flex-col my-6 pr-6">
      <div className="flex flex-col items-start">
        <Breadcrumb pathSegments={pathSegments} />
      </div>
      <div className="container-xl lg:container m-auto">
        {products.length === 0 ? (
          <p> کالایی یافت نشد! </p>
        ) : (
          <div className="py-6 grid grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default BrandNamePage;
