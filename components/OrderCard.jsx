"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const OrderCard = ({ order }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = new Date(order.updatedAt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formatted = date.toLocaleDateString("fa-IR", options);
    setFormattedDate(formatted);
  }, [order.updatedAt]);

  return (
    <div className=" text-gray-700 mb-4 flex items-center gap-6 border border-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
      <div className=" w-full">
        <div className="info mb-3 w-full">
          <div className="p-2 w-full flex flex-col gap-3 md:flex-row justify-between mb-3">
            <div className="font-bold">
              شماره فاکتور :{"   "}
              <span className="px-1 border-b border-gray-700 text-center ">
                {order.orderNum}
              </span>
            </div>

            <div className="font-bold ">
              تاریخ :{"   "}
              <span className="px-1 text-center ">{formattedDate}</span>
            </div>
          </div>

          <div className="font-bold mb-3 ">
            تعداد کالاها :{"   "}
            <span className="px-1 text-center ">{order.totalQuantity}</span>
          </div>

          <div className="mb-2">
            <span className="font-bold">مجموع قیمت :</span>
            {"  "}
            {order.totalAmount.toLocaleString()}
            {"  "}
            <span>تومان</span>
          </div>
        </div>
        <div className="m-2 flex justify-end">
          <Link
            href={`/profile/orders/${order._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-center text-xs md:text-sm"
          >
            جزییات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
