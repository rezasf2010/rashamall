"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/utils/requests";
import ProductListCard from "@/componentsAdmin/ProductListCard";
import { ProductListCardSkeleton } from "@/ui/skeletons";

import React from "react";

const ProductsListPage = () => {
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

  return (
    <div className=" w-full bg-blue-50 gap-4 flex flex-col items-center">
      <div className="w-11/12 m-auto py-16">
        <div className="bg-white min-h-3/4 flex flex-col items-center px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-lg md:text-3xl text-center font-semibold mb-6">
            لیست کالاها
          </h2>

          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <ProductListCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductListCard key={product._id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;
