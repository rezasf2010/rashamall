"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaBars } from "react-icons/fa";
import NewOrderCount from "./NewOrderCount";
import NewMessagesCount from "./NewMessagesCount";
import { auth } from "@/utils/firebaseConfig";
import { signOut } from "firebase/auth";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handelSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log("User signed out successfully");
      // Optionally, redirect the user to a different page or show a message
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className=" border border-blue-200 p-2 rounded bg-blue-100 shadow-md absolute top-2 right-4 lg:hidden flex items-center gap-2 z-50"
        onClick={toggleMenu}
      >
        <div className="text-lg font-semibold">Menu</div>
        <FaBars className="text-2xl" />
      </button>
      <nav
        className={`w-64 absolute right-0 top-14 lg:top-0 flex flex-col justify-between items-center bg-blue-100 text-gray-700 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 z-40`}
      >
        <div className="flex flex-col items-center">
          <h2 className="p-5 font-bold text-xl">پنل مدیریت</h2>
          <div className="px-3 w-full flex flex-col gap-2">
            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard"
              onClick={toggleMenu}
            >
              داشبورد
              <FaChevronLeft className="text-gray-400" />
            </Link>

            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard/orders"
              onClick={toggleMenu}
            >
              سفارشات
              <NewOrderCount />
              <FaChevronLeft className="text-gray-400" />
            </Link>

            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard/messages"
              onClick={toggleMenu}
            >
              پیام ها
              <NewMessagesCount />
              <FaChevronLeft className="text-gray-400" />
            </Link>

            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard/add"
              onClick={toggleMenu}
            >
              افزودن کالا
              <FaChevronLeft className="text-gray-400" />
            </Link>

            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard/category-add"
              onClick={toggleMenu}
            >
              افزودن دسته بندی کالاها
              <FaChevronLeft className="text-gray-400" />
            </Link>

            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard/products-list"
              onClick={toggleMenu}
            >
              لیست کالاها
              <FaChevronLeft className="text-gray-400" />
            </Link>

            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard/category-list"
              onClick={toggleMenu}
            >
              لیست دسته بندی کالاها
              <FaChevronLeft className="text-gray-400" />
            </Link>

            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard/mag-add"
              onClick={toggleMenu}
            >
              افزودن مقاله
              <FaChevronLeft className="text-gray-400" />
            </Link>

            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard/mag-list"
              onClick={toggleMenu}
            >
              لیست مقاله ها
              <FaChevronLeft className="text-gray-400" />
            </Link>

            <Link
              className="border border-blue-200 shadow-md flex justify-between items-center w-full py-2 rounded-lg px-4"
              href="/admin/dashboard/users"
              onClick={toggleMenu}
            >
              کاربران
              <FaChevronLeft className="text-gray-400" />
            </Link>
          </div>
        </div>
        <div
          onClick={handelSignOut}
          className="mb-8 mt-16 border border-orange-500 py-2 px-4 rounded-lg bg bg-orange-500 text-white cursor-pointer"
        >
          sign out
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
