"use client";
import { useState, useEffect } from "react";
import { convertToJalaali } from "@/utils/calenderConvert";
import { fetchUsers } from "@/utils/requests";
import { OrderCardSkeleton } from "@/ui/skeletons";
import SpinnerH from "@/components/SpinnerH";
import Link from "next/link";

const OrderCardAdmin = ({ order }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <OrderCardSkeleton />;
  }

  const persianDateAndTime = convertToJalaali(order.date);
  const user = users.filter((user) => user._id === order.user);

  return (
    <div className=" text-gray-700 mb-4 flex flex-col md:flex-row items-center md:items-end  gap-6 border border-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
      <div className="info w-full flex flex-col gap-3">
        <div className="order-time">
          <span className="font-semibold">زمان سفارش :</span>{" "}
          {persianDateAndTime}
        </div>

        <div className="orderer">
          <span className="font-semibold">سفارش دهنده :</span> {user[0].name}
        </div>

        <div className="orderer-mobile">
          <span className="font-semibold">تلفن همراه :</span> {user[0].mobile}
        </div>

        <div className="orderer-adress">
          <span className="font-semibold">مبلغ کل :</span>{" "}
          {order.totalAmount.toLocaleString()} <span>تومان</span>
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-end">
        <Link
          href={`/admin/dashboard/orders/${order._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto px-4 py-1 md:py-2 rounded-lg text-center text-xs md:text-sm"
        >
          جزییات سفارش
        </Link>
      </div>
    </div>
  );
};

export default OrderCardAdmin;
