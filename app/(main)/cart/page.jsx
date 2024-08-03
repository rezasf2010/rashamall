"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartProduct from "@/components/CartProduct";
import { useGlobalContext } from "@/context/UserGlobalContext";
import SpinnerH from "@/components/SpinnerH";
import { fetchProducts } from "@/utils/requests";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const { cart, clearCart } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    return total + unitPrice * cart[product._id].quantity;
  }, 0);

  const handleNext = () => {
    router.push("/checkout");
  };

  return (
    <div className="w-full my-12 px-6 flex flex-col lg:flex-row gap-4 items-center lg:items-start justify-center">
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
                quantity={cart[product._id].quantity}
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
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={clearCart}
          >
            خالی کردن سبد خرید
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleNext}
            disabled={cartProducts.length === 0}
          >
            مرحله بعد
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
