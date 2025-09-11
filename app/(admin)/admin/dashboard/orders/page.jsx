'use client';
import { useState, useEffect } from 'react';
import { fetchOrders } from '@/utils/requests';
import OrderCardAdmin from '@/componentsAdmin/OrderCardAdmin';
import { OrderCardSkeleton } from '@/ui/skeletons';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const orders = await fetchOrders();
        setOrders(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  };

  return (
    <section className="w-full">
      <div className="lg:w-11/12 lg:m-auto flex justify-center">
        <div className="bg-white w-full px-6 py-8 mb-4 shadow-md rounded-md border">
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
                <OrderCardAdmin key={order._id} order={order} onDelete={handleDeleteOrder} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrdersPage;
