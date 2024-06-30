"use Client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Spinner from "@/components/Spinner";

const ProductCategoryItems = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryProducts = products.filter(
    (product) =>
      product.main_category === categoryId ||
      product.sub_category === categoryId,
  );

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categoryProducts === 0 ? (
        <p> No products found </p>
      ) : (
        categoryProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductCategoryItems;
