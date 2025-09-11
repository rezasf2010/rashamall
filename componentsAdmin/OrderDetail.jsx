'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { convertToJalaali } from '@/utils/calenderConvert';
import { fetchUsers, fetchOrder } from '@/utils/requests';

const OrderDetail = () => {
  const [order, setOrder] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const orderId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) return;
      try {
        const users = await fetchUsers();
        const order = await fetchOrder(orderId);
        setUsers(users);
        setOrder(order);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const persianDateAndTime = order.date ? convertToJalaali(order.date) : 'N/A';
  const user = users.find((user) => user._id === order.user);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="print flex flex-col gap-6">
        <h2 className="text-lg md:text-2xl text-center font-semibold mb-6">جزییات سفارش مشتری</h2>
        <div className="border border-gray-200 rounded-xl shadow-xl p-3 flex flex-col gap-3 mb-3">
          <div className="order-time text-sm sm:text-base">
            <span className="font-semibold">زمان سفارش :</span> {persianDateAndTime}
          </div>

          <div className="flex flex-col gap-3 md:flex-row md: justify-between">
            <div className="orderer text-sm sm:text-base">
              <span className="font-semibold">سفارش دهنده :</span> {user.name}
            </div>

            <div className="orderer-mobile text-sm sm:text-base">
              <span className="font-semibold">تلفن همراه :</span> 0{user.mobile}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md: justify-between">
            <div className="orderer-adress text-sm sm:text-base">
              <span className="font-semibold">آدرس :</span>{' '}
              {`${user.address.state}, ${user.address.city}, ${user.address.street}`}
            </div>

            <div className="orderer-zip text-sm sm:text-base">
              <span className="font-semibold">کدپستی :</span> {user.address.zip}
            </div>
          </div>
        </div>

        <h4 className="text-lg my-3 mx-4 md:text-xl font-semibold md:my-6">لیست کالاهای سفارشی</h4>

        <div className="border border-gray-200 shadow-xl">
          <table className="w-full bg-white text-xs md:text-sm lg:text-base">
            <thead>
              <tr className="w-full bg-gray-200">
                <th className="px-1 py-2 text-center">شماره</th>
                <th className="px-1 py-2 text-center">نام کالا</th>
                <th className="px-1 py-2 text-center">تعداد</th>
                <th className="px-1 py-2 text-center">قیمت واحد</th>
                <th className="px-2 py-2 text-center">قیمت کل</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <OrderItem key={item._id} item={item} index={index} />
              ))}
            </tbody>
            <tfoot className="w-full bg-gray-200">
              <tr>
                <td className="px-1 py-2 text-center"> </td>
                <td className="px-1 py-2 text-center">تعداد کل</td>
                <td className="px-1 py-2 text-center">{order.totalQuantity}</td>
                <td className="px-1 py-2 text-center font-semibold">جمع کل</td>
                <td className="px-2 py-2 text-center font-semibold">
                  {order.totalAmount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <Link href="/admin/dashboard/orders" passHref>
          <button className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-gray-400 text-white rounded-lg hover:bg-gray-500">
            بازگشت
          </button>
        </Link>
        <button className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-green-500 text-white rounded-lg hover:bg-green-600">
          تایید
        </button>
        <button
          className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handlePrint}
        >
          چاپ سفارش
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
