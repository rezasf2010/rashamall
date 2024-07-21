import React from "react";
import OrderDetail from "@/componentsAdmin/OrderDetail";

const OrderDetailPge = () => {
  return (
    <section className="bg-blue-50 w-full">
      <div className="w-11/12 m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <OrderDetail />
        </div>
      </div>
    </section>
  );
};

export default OrderDetailPge;