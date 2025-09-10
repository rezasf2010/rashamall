'use Client';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Spinner from '@/components/Spinner';
import Pagination from '@/components/pagination';

const ProductCategoryItems = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const res = await fetch(`/api/products/${categoryId}?page=${page}&pageSize=${pageSize}`);

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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        {products.length === 0 ? (
          <p className="text-center text-xl font-semibold mt-10"> کالایی یافت نشد! </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:place-items-center">
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

export default ProductCategoryItems;
