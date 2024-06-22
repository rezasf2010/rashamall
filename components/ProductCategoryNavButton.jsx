'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from 'react-icons/fa';

import profileDefault from "@/assets/images/profile.png";


const ProductCategoryNavButton = () => {
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  return (
    <div className="relative ml-3">
      <div
        className="relative border border-gray-400 flex p-2 rounded-lg text-sm focus:outline-none focus:bg-blue-300 focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800"
      >
        <button 
          onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
          className="mt-1 mr-2 "
          aria-label="Toggle menu"
        >
          <FaChevronDown className="text-gray-400" />
        </button>
        <Link
          href="/product-category"
          id="category-button"
        >
          <span className="sr-only">Open category page</span>
          Cat 1
        </Link>
      </div>

      {/* <!-- Profile dropdown --> */}
      {isCategoryMenuOpen && ( 
        <div
          id="user-menu"
          className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="category-menu-button"
          tabIndex="-1"
        >
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex="-1"
            id="item-menu-item-0"
            onClick={() => {
              setIsCategoryMenuOpen(false);
            }}
          >
            Item 1
          </Link>
        </div>
      )
      }
  </div>
  )
}

export default ProductCategoryNavButton