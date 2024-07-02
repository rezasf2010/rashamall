"use Client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Spinner from "@/components/Spinner";
import { fetchProducts } from "@/utils/requests";

const ProductCategoryItems = ({ categoryId }) => {
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

  const categoryProducts = products.filter(
    (product) =>
      product.main_category === categoryId ||
      product.sub_category === categoryId,
  );

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categoryProducts.length === 0 ? (
        <p className="text-center text-xl font-semibold mt-10">
          {" "}
          کالایی یافت نشد!{" "}
        </p>
      ) : (
        categoryProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductCategoryItems;
