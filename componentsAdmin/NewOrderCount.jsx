"use client";
import { useEffect } from "react";
import { useAdminGlobalContext } from "@/context/AdminGlobalContext";

const NewOrderCount = () => {
  const { newOrderCount, setNewOrderCount } = useAdminGlobalContext();

  useEffect(() => {
    const fetchNewOrdersCount = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/orders/newOrders-count`,
        );

        if (res.status === 200) {
          const data = await res.json();
          setNewOrderCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewOrdersCount();
  }, []);

  return (
    newOrderCount > 0 && (
      <span className="items-center justify-center px-2 py-1 text-xs font-bold  text-white  bg-red-600 rounded-full">
        {newOrderCount}
      </span>
    )
  );
};

export default NewOrderCount;
