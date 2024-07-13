"use client";
import { useState, useEffect } from "react";
import CartProduct from "@/components/CartProduct";
import { useGlobalContext } from "@/context/GlobalContext";
import SpinnerH from "@/components/SpinnerH";
import { fetchProducts } from "@/utils/requests";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const { cart } = useGlobalContext();
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
  }, [cart]);

  if (loading) {
    return <SpinnerH loading={loading} />;
  }

  const cartProducts = products.filter((product) => cart[product._id]);

  const totalCartPrice = cartProducts.reduce((total, product) => {
    const unitPrice = product.is_onSale
      ? Math.ceil(product.price - (product.price * product.discount) / 100)
      : Math.ceil(product.price);
    return total + unitPrice * cart[product._id];
  }, 0);

  return (
    <div className="border border-red-500 w-full my-12 px-6 flex flex-col lg:flex-row gap-4 items-center lg:items-start justify-center">
      <div className="top right w-full lg:w-2/3">
        <div className="border border-gray-300 bg-blue-50 w-full md:w-full p-4 rounded-2xl shadow-2xl">
          <h4 className="font-bold text-lg mb-4">سبد خرید شما</h4>
          {cartProducts.length === 0 ? (
            <p>سبد خرید شما خالی است</p>
          ) : (
            cartProducts.map((product) => (
              <CartProduct
                key={product._id}
                product={product}
                quantity={cart[product._id]}
              />
            ))
          )}
        </div>
      </div>
      <div className=" top left sum w-full lg:w-1/3">
        <div className="border border-gray-300 bg-blue-50 w-full md:w-full p-4 rounded-2xl shadow-2xl">
          <h4 className="font-bold text-lg mb-4">جمع کل سبد خرید</h4>
          <span className="font-bold">مجموع : </span> {"  "}
          {totalCartPrice.toLocaleString()}
          {"  "}
          <span>تومان</span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
