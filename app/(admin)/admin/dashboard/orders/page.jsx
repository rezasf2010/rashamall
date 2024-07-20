"use client";
import { useState, useEffect } from "react";
import { fetchOrders } from "@/utils/requests";
import OrderCardAdmin from "@/componentsAdmin/OrderCardAdmin";
import { OrderCardSkeleton } from "@/ui/skeletons";
import Spinner from "@/components/Spinner";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const orders = await fetchOrders();
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <section className="bg-blue-50 w-full">
      <div className="w-11/12 m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-xl md:text-3xl text-center font-semibold mb-6">
            لیست سفارش مشتری ها
          </h2>
          <div className="">
            {loading ? (
              Array(5)
                .fill(null)
                .map((_, index) => <OrderCardSkeleton key={index} />)
            ) : orders.length === 0 ? (
              <p>سفارشی موجود نیست</p>
            ) : (
              orders.map((order) => (
                <OrderCardAdmin key={order._id} order={order} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrdersPage;
