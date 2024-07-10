"use client";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

const AddToCart = ({ productId }) => {
  const { cart, setCart, setCartCount } = useGlobalContext();
  const [numberOfOrder, setNumberOfOrder] = useState(0);

  useEffect(() => {
    if (cart[productId]) {
      setNumberOfOrder(cart[productId]);
    }
  }, [cart, productId]);

  const handleAddToCart = () => {
    const newCart = { ...cart, [productId]: (cart[productId] || 0) + 1 };
    setCart(newCart);
    setCartCount(Object.values(newCart).reduce((a, b) => a + b, 0));
    setNumberOfOrder(newCart[productId]);
  };

  const handleRemoveFromCart = () => {
    const newCart = { ...cart, [productId]: (cart[productId] || 0) - 1 };
    if (newCart[productId] <= 0) {
      delete newCart[productId];
    }
    setCart(newCart);
    setCartCount(Object.values(newCart).reduce((a, b) => a + b, 0));
    setNumberOfOrder(newCart[productId] || 0);
  };

  return (
    <div className="flex gap-3">
      <button
        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm w-full"
        onClick={handleAddToCart}
      >
        افزودن به سبد خرید
      </button>
      {numberOfOrder > 0 && (
        <div className="flex gap-3 lg:gap-1">
          <div className="border border-gray-500 w-9 h-9 rounded-lg flex items-center justify-center">
            {numberOfOrder}
          </div>
          <button
            type="button"
            className="bg-orange-500 text-white w-9 h-9 rounded-lg"
            onClick={handleRemoveFromCart}
            disabled={numberOfOrder === 0}
          >
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
