"use client";
import { useState, useEffect } from "react";
import { convertToJalaali } from "@/utils/calenderConvert";
import { fetchUsers } from "@/utils/requests";
import { OrderCardSkeleton } from "@/ui/skeletons";
import { useGlobalContext } from "@/context/GlobalContext";
import { toast } from "react-toastify";
import Link from "next/link";

const OrderCardAdmin = ({ order, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOrderNew, setIsOrderNew] = useState(order.isNew);

  const { setNewOrderCount } = useGlobalContext();

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

  const handelOpenClick = async () => {
    try {
      const res = await fetch(`/api/orders/${order._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { isNew } = await res.json();
        setIsOrderNew(isNew);
        setNewOrderCount((prevCount) => {
          if (isOrderNew) {
            return prevCount - 1;
          }
          return prevCount;
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm("آیا از حذف این سفارش اطمینان دارید؟")) {
      try {
        const res = await fetch(`/api/orders/${order._id}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          onDelete(order._id); // Remove order from UI
          toast.success("سفارش با موفقیت حذف شد");
        } else {
          toast.error("مشکل در حذف سفارش");
        }
      } catch (error) {
        console.log(error);
        toast.error("مشکل در حذف سفارش");
      }
    }
  };

  return (
    <div className=" relative text-gray-700 mb-4 flex flex-col md:flex-row items-center md:items-end  gap-6 border border-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
      {isOrderNew && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          جدید
        </div>
      )}
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
      <div className="w-full flex justify-center md:justify-end gap-2">
        <Link
          href={`/admin/dashboard/orders/${order._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto px-4 py-1 md:py-2 rounded-lg text-center text-xs md:text-sm"
          onClick={handelOpenClick}
        >
          جزییات سفارش
        </Link>
        <button
          className="bg-red-500 hover:bg-red-600 text-white w-full md:w-auto px-4 py-1 md:py-2 rounded-lg text-center text-xs md:text-sm"
          onClick={handleDeleteClick}
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default OrderCardAdmin;
