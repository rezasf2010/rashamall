"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Spinner from "@/components/Spinner";
import { fetchProducts } from "@/utils/requests";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="py-6">
      <div className="container-xl lg:container m-auto">
        {products.length === 0 ? (
          <p> کالایی یافت نشد! </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
