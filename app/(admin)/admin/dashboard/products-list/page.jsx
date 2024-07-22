"use client";

import { useState, useEffect } from "react";
import { fetchCategories, fetchProducts } from "@/utils/requests";
import ProductListCard from "@/componentsAdmin/ProductListCard";
import { ProductListCardSkeleton } from "@/ui/skeletons";
import { toast } from "react-toastify";

const ProductsListPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const categories = await fetchCategories();
        const products = await fetchProducts();
        setCategories(categories);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm("آیا از حذف این کالا اطمینان دارید؟");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/1/1/${productId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId),
        );
        toast.success("محصول حذف شد");
      } else {
        toast.error("مشکل در حذف محصول");
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکل در حذف محصول");
    }
  };

  return (
    <div className=" w-full gap-4 flex flex-col items-center">
      <div className="w-11/12 m-1 md:m-auto">
        <div className="bg-white min-h-3/4 flex flex-col items-center px-2 sm:px-4 py-4 md:px-6 mb-4 shadow-md rounded-md border">
          <h2 className="text-lg md:text-3xl text-center font-semibold mb-6">
            لیست کالاها
          </h2>

          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <ProductListCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductListCard
                  key={product._id}
                  product={product}
                  categories={categories}
                  onDelete={handleDeleteProduct}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;
