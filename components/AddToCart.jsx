"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/context/GlobalContext";
import { toast } from "react-toastify";

const AddToCart = ({ productId }) => {
  const { data: session } = useSession();
  const { cart, updateCart } = useGlobalContext();
  const [numberOfOrder, setNumberOfOrder] = useState(0);

  useEffect(() => {
    if (cart[productId]) {
      setNumberOfOrder(cart[productId]);
    }
  }, [cart, productId]);

  const handleAddToCart = () => {
    if (!session) {
      toast.error("ابتدا وارد حساب کاربری شوید");
      return;
    }
    const newQuantity = numberOfOrder + 1;
    setNumberOfOrder(newQuantity);
    updateCart(productId, newQuantity);
  };

  const handleRemoveFromCart = () => {
    const newQuantity = numberOfOrder - 1;
    setNumberOfOrder(newQuantity);
    updateCart(productId, newQuantity);
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
