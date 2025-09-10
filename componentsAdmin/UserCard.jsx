'use client';
import { useState, useEffect } from 'react';

const UserCard = ({ user, onDelete }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (user.address) {
      setAddress(
        `${user.address.state}, ${user.address.city}, ${user.address.street}, کدپستی: ${user.address.zip}`,
      );
    }
  }, [user.address]);

  return (
    <div className="text-gray-700 mb-4 flex flex-col md:flex-row items-center md:items-end gap-6 border border-gray-300 w-full p-4 rounded-2xl shadow-xl bg-gray-50">
      <div className="info w-full">
        <div className="mb-2 text-sm sm:text-base">
          <span className="font-semibold">نام کاربر: </span>
          {user.name || 'N/A'}
        </div>
        <div className="mb-2 text-sm sm:text-base">
          <span className="font-semibold">ایمیل: </span>
          {user.email}
        </div>
        <div className="mb-2 text-sm sm:text-base">
          <span className="font-semibold">نام کاربری: </span>
          {user.username || 'N/A'}
        </div>
        {address && (
          <div className="mb-2 text-sm sm:text-base">
            <span className="font-semibold">آدرس: </span>
            {address}
          </div>
        )}
        <div className="mb-2 text-sm sm:text-base">
          <span className="font-semibold">موبایل: </span>
          {`0${user.mobile}` || 'N/A'}
        </div>
        <div className="w-full flex gap-2 md:justify-end">
          <Link
            href={`/admin/dashboard/users/${user.email}`}
            className="w-1/2 flex md:justify-end md:w-auto"
          >
            <button className="w-full md:w-auto text-sm font-semibold px-2 py-1 sm:px-4 sm:py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
              ویرایش
            </button>
          </Link>
          <button
            onClick={() => onDelete(user._id)}
            className="w-1/2 md:w-auto text-sm font-semibold px-2 py-1 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
