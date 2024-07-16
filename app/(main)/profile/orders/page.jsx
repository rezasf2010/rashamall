import React from "react";
import OrderCard from "@/components/OrderCard";

const OrdersPage = () => {
  return (
    <div className=" border border-red-500 w-full my-12 px-6 flex flex-col gap-4 items-start justify-center">
      <h4 className="font-bold text-lg mb-4">سفارش ها</h4>
      <OrderCard />
      OrdersPage
    </div>
  );
};

export default OrdersPage;
