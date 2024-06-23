'use client';
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CategoryDropdownItem from "./CategoryDropdownItem";
import { FaChevronDown } from 'react-icons/fa';

import profileDefault from "@/assets/images/profile.png";


const ProductCategoryNavButton = ({ category, categories, openDropdown, setOpenDropdown }) => {
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const { fa_name, _id, slug } = category;
    const isOpen = openDropdown === _id;
    const hasChildren = categories.some((cat) => cat.parent === _id);



  return (
    <div className="relative ml-3">
      <div
        className="relative border border-gray-400 flex p-2 rounded-lg text-sm focus:outline-none focus:bg-blue-300 focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800"
      >
        {hasChildren && (
          <button 
            onClick={() => {setOpenDropdown(isOpen ? null : _id)
              setIsCategoryMenuOpen((prev) => !prev)
            }}
            className="mt-1 mr-2 "
            aria-label="Toggle menu"
          >
            <FaChevronDown className="text-gray-400" />
          </button>
        )}
        <Link
          href={`/products/${slug}`}
          id="category-button"
        >
          <span className="sr-only">Open category page</span>
          {fa_name}
        </Link>
      </div>

      {/* <!-- Category dropdown --> */}
      {isCategoryMenuOpen && isOpen && ( 
        <CategoryDropdownItem 
          handleDropdownOpen={setIsCategoryMenuOpen}
          category = {category}
          categories={categories}
          parentSlug={slug}
        />
      )
      }
  </div>
  )
}

export default ProductCategoryNavButton