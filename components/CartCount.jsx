"use client";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/UserGlobalContext";

const CartCount = ({ session }) => {
  const { cartCount } = useGlobalContext();

  useEffect(() => {
    if (!session) return;
  }, [cartCount]);

  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {cartCount}
    </span>
  );
};

export default CartCount;
