import React from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <div className="w-[250px] lg:w-[320px] absolute right-0 h-full bg-blue-50 flex flex-col items-center justify-between text-gray-700">
      <div className="w-full flex flex-col items-center">
        <h2 className="p-5 font-bold text-xl">پنل مدیریت</h2>
        <nav className="flex flex-col justify-around items-start w-full gap-2 px-3">
          <Link
            className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
            href="/admin/dashboard"
          >
            داشبورد
            <FaChevronLeft className="text-gray-400" />
          </Link>

          <Link
            className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
            href="/admin/dashboard/orders"
          >
            سفارشات
            <FaChevronLeft className="text-gray-400" />
          </Link>

          <Link
            className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
            href="/admin/dashboard/add"
          >
            افزودن کالا
            <FaChevronLeft className="text-gray-400" />
          </Link>

          <Link
            className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
            href="/admin/dashboard/category-add"
          >
            افزودن دسته بندی کالاها
            <FaChevronLeft className="text-gray-400" />
          </Link>

          <Link
            className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
            href="/admin/dashboard/product-list"
          >
            لیست کالاها
            <FaChevronLeft className="text-gray-400" />
          </Link>

          <Link
            className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
            href="/admin/dashboard/category-list"
          >
            لیست دسته بندی کالاها
            <FaChevronLeft className="text-gray-400" />
          </Link>

          <Link
            className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
            href="/admin/dashboard/mag-add"
          >
            افزودن مقاله
            <FaChevronLeft className="text-gray-400" />
          </Link>

          <Link
            className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
            href="/admin/dashboard/mag-list"
          >
            لیست مقاله ها
            <FaChevronLeft className="text-gray-400" />
          </Link>

          <Link
            className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
            href="/admin/dashboard/users"
          >
            کاربران
            <FaChevronLeft className="text-gray-400" />
          </Link>
          {/* Add more links here */}
        </nav>
      </div>
      <div className="mb-8 border border-orange-500 py-2 px-4 rounded-lg bg bg-orange-500 text-white">
        sign out
      </div>
    </div>
  );
};

export default AdminNavbar;
