"use client";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

const CartCount = ({ session }) => {
  const { cartCount, setCartCount } = useGlobalContext();
  // const [count, setCount] = useState (0);

  // useEffect(() => {
  //   if (!session) return;

  //   setCount(cartCount);
  // }, [cartCount]);

  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {cartCount}
    </span>
  );
};

export default CartCount;
