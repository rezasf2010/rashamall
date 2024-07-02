"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { usePathname } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { fetchProduct } from "@/utils/requests";

const ProductPage = () => {
  const pathName = usePathname();

  // Split the pathName by '/'
  const pathParts = pathName.split("/");

  const mainCategoryId = pathParts[2];
  const subCategoryId = pathParts[3];
  const productId = pathParts[4];

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;
      try {
        const product = await fetchProduct(
          mainCategoryId,
          subCategoryId,
          productId,
        );
        setProduct(product);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (!product && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Product Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && product && (
        <div className="p-2 mt-6">
          <ProductDetails product={product} />
        </div>
      )}
    </>
  );
};

export default ProductPage;
