"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Spinner from "@/components/Spinner";
import { fetchProducts } from "@/utils/requests";

const ProductsOnSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  const saleProducts = products.filter((product) => product.is_onSale);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        {saleProducts.length === 0 ? (
          <p className="text-center text-xl font-semibold mt-10">
            {" "}
            کالایی یافت نشد!{" "}
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {saleProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsOnSale;
