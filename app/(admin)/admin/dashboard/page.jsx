"use client";
import { useState, useEffect } from "react";
import { fetchPosts, fetchProducts, fetchOrders } from "@/utils/requests";
import Spinner from "@/components/Spinner";
import { useAdminGlobalContext } from "@/context/AdminGlobalContext";

const AdminDashboardPage = () => {
  const { newOrderCount, newMessageCount } = useAdminGlobalContext();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await fetchOrders();
        const data = await fetchProducts();
        const posts = await fetchPosts();
        setOrders(orders);
        setProducts(data.totalProducts);
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;

  const inStockProducts = products.filter(
    (product) => product._stock_status === "in stock",
  );
  const inStockProductsCount = inStockProducts.length;

  const totalPostsCount = posts.length;

  return (
    <div className="w-full">
      <div className="lg:w-11/12 lg:m-auto flex justify-center">
        <div className="bg-white w-full flex justify-center px-6 py-8 mb-4 shadow-md rounded-md border">
          <div className="w-full text-gray-700 p-2 md:p-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="border border-gray-300 bg-gray-50 rounded-2xl shadow-xl p-2 text-center flex flex-col gap-3">
              تعداد کل سفارش ها
              <div className="font-bold text-blue-800 text-xl">
                {totalOrdersCount}
              </div>
            </div>
            <div className="border border-gray-300 bg-gray-50 rounded-2xl shadow-xl p-2 text-center flex flex-col gap-3">
              سفارش های جدید
              <div className="font-bold text-blue-800 text-xl">
                {newOrderCount}
              </div>
            </div>
            <div className="border border-gray-300 bg-gray-50 rounded-2xl shadow-xl p-2 text-center flex flex-col gap-3">
              تعداد پیام های جدید
              <div className="font-bold text-blue-800 text-xl">
                {newMessageCount}
              </div>
            </div>
            <div className="border border-gray-300 bg-gray-50 rounded-2xl shadow-xl p-2 text-center flex flex-col gap-3">
              تعداد کالاها
              <div className="font-bold text-blue-800 text-xl">
                {totalProductsCount}
              </div>
            </div>
            <div className="border border-gray-300 bg-gray-50 rounded-2xl shadow-xl p-2 text-center flex flex-col gap-3">
              تعداد کالاهای موجود
              <div className="font-bold text-blue-800 text-xl">
                {inStockProductsCount}
              </div>
            </div>
            <div className="border border-gray-300 bg-gray-50 rounded-2xl shadow-xl p-2 text-center flex flex-col gap-3">
              تعداد مقالات
              <div className="font-bold text-blue-800 text-xl">
                {totalPostsCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
