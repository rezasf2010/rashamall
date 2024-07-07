"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { usePathname } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { fetchProduct, fetchCategories } from "@/utils/requests";
import Breadcrumb from "@/components/Breadcrumb";

const ProductPage = () => {
  const pathName = usePathname();

  // Split the pathName by '/'
  const pathParts = pathName.split("/");

  const mainCategoryId = pathParts[2];
  const subCategoryId = pathParts[3];
  const productId = pathParts[4];

  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
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

        const categories = await fetchCategories();

        setProduct(product);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const mainCategory = categories.filter(
    (category) => category._id === mainCategoryId,
  );
  const mainCategoryTitle =
    mainCategory.length > 0 ? mainCategory[0].fa_name : "";

  const mainCategoryPath =
    mainCategory.length > 0 ? `${mainCategory[0].slug}` : "";
  const mainCategoryPathWithId =
    mainCategory.length > 0
      ? `${mainCategory[0].slug}-${mainCategory[0]._id}`
      : "";

  const subCategory = categories.filter(
    (category) => category._id === subCategoryId,
  );
  const subCategoryTitle = subCategory.length > 0 ? subCategory[0].fa_name : "";
  const subCategoryPath =
    subCategory.length > 0
      ? `${subCategory[0].slug}-${subCategory[0]._id}`
      : "";

  const pathSegments = [
    { name: "خانه", link: "/" },
    { name: "همه کالاها", link: "/products" },
    { name: mainCategoryTitle, link: `/products/${mainCategoryPathWithId}` },
    {
      name: subCategoryTitle,
      link: `/products/${mainCategoryPath}/${subCategoryPath}`,
    },
    { name: product.name },
  ];

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
        <div className="p-4 mt-6">
          <Breadcrumb pathSegments={pathSegments} />
          <ProductDetails product={product} />
        </div>
      )}
    </>
  );
};

export default ProductPage;
