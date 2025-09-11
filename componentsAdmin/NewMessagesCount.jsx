'use client';
import { useEffect } from 'react';
import { useAdminGlobalContext } from '@/context/AdminGlobalContext';

const NewOrderCount = () => {
  const { newMessageCount, setNewMessageCount } = useAdminGlobalContext();

  useEffect(() => {
    const fetchNewMessagesCount = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/messages/newMessages-count`);

        if (res.status === 200) {
          const data = await res.json();
          setNewMessageCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewMessagesCount();
  }, []);

  return (
    newMessageCount > 0 && (
      <span className="items-center justify-center px-2 py-1 text-xs font-bold  text-white  bg-red-600 rounded-full">
        {newMessageCount}
      </span>
    )
  );
};

export default NewOrderCount;
