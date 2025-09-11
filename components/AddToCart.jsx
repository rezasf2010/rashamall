'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useGlobalContext } from '@/context/UserGlobalContext';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const AddToCart = ({ productId, price, status }) => {
  const { data: session } = useSession();
  const { cart, updateCart, cartCount } = useGlobalContext();
  const [numberOfOrder, setNumberOfOrder] = useState(0);

  console.log(cartCount);

  useEffect(() => {
    if (cart[productId]) {
      setNumberOfOrder(cart[productId].quantity); // Update to reflect correct cart structure);
    }
  }, [cart, productId]);

  const handleAddToCart = () => {
    if (!session) {
      toast.error('ابتدا وارد حساب کاربری شوید');
      return;
    }
    const newQuantity = numberOfOrder + 1;
    setNumberOfOrder(newQuantity);
    updateCart(productId, newQuantity, price);
  };

  const handleRemoveFromCart = () => {
    const newQuantity = numberOfOrder - 1;
    setNumberOfOrder(newQuantity);
    updateCart(productId, newQuantity, price);
  };

  return (
    <div className="flex gap-3 px-4 sm:px-1 md:px-4 items-center justify-between">
      <div>
        {numberOfOrder === 0 ? (
          <button
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm w-full"
            onClick={handleAddToCart}
            disabled={status != 'in stock'}
          >
            افزودن به سبد خرید
          </button>
        ) : (
          <div className="flex items-center gap-2 sm:gap-1 md:gap-2">
            <button
              className="bg-blue-500 text-white w-9 h-9 rounded-lg flex items-center justify-center"
              onClick={handleAddToCart}
            >
              +
            </button>
            <div className="border border-blue-500 w-9 h-9 rounded-lg flex items-center justify-center">
              {numberOfOrder}
            </div>
            <button
              className="bg-blue-500 text-white w-9 h-9 rounded-lg flex items-center justify-center"
              onClick={handleRemoveFromCart}
            >
              {numberOfOrder === 1 ? <FaTrash /> : '-'}
            </button>
          </div>
        )}
      </div>

      <div>
        {cartCount > 0 && (
          <Link href="/cart">
            <button
              type="button"
              className="flex justify-center px-4 py-2 rounded-lg text-center text-sm sm:text-xs md:text-sm bg-gray-800 text-gray-400 hover:text-white "
            >
              سبد خرید
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
