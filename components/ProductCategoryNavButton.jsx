"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import CategoryDropdownItem from "./CategoryDropdownItem";

const ProductCategoryNavButton = ({
  category,
  categories,
  openDropdown,
  setOpenDropdown,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const { fa_name, _id, slug } = category;
  const isOpen = openDropdown === _id;
  const hasChildren = categories.some((cat) => cat.parent === _id);

  return (
    <div className="relative">
      <div
        className={`relative border border-gray-400 flex p-2 rounded-lg text-sm focus:outline-none focus:bg-blue-300 focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800 md:text-xs ${
          !hasChildren ? "" : "justify-between"
        }`}
      >
        <Link
          href={`/products/${slug}-${_id}`}
          id="category-button"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setOpenDropdown(false);
          }}
        >
          <span className="sr-only">Open category page</span>
          {fa_name}
        </Link>
        {hasChildren && (
          <button
            onMouseEnter={() => setOpenDropdown(isOpen ? null : _id)}
            className="mt-1 mr-1 lg:mr-3"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaChevronDown className="text-gray-400" />
            ) : (
              <FaChevronLeft className="text-gray-400" />
            )}
          </button>
        )}
      </div>

      {isOpen && hasChildren && (
        <CategoryDropdownItem
          handleDropdownOpen={setOpenDropdown}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          category={category}
          categories={categories}
          parentSlug={slug}
        />
      )}
    </div>
  );
};

export default ProductCategoryNavButton;
