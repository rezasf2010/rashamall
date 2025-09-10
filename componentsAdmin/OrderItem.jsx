'use client';
import { useState, useEffect } from 'react';
import { fetchProduct } from '@/utils/requests';

const OrderItem = ({ item, index }) => {
  const [itemObj, setItemObj] = useState({});
  const [loading, setLoading] = useState(true);

  const productId = item.product;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await fetchProduct('mainCat', 'subCat', productId);
        setItemObj(item);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [productId]);

  if (loading) {
    return <OrderItemSkeleton key={index} />;
  }

  return (
    <tr className="border-b">
      <td className="px-1 py-2 text-center">{index + 1}</td>
      <td className="px-1 py-2 text-wrap">{itemObj.name}</td>
      <td className="px-1 py-2 text-center">{item.quantity}</td>
      <td className="px-1 py-2 text-center">{item.price.toLocaleString()}</td>
      <td className="px-2 py-2 text-center">{item.totalPrice.toLocaleString()}</td>
    </tr>
  );
};

export default OrderItem;
