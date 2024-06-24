'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/images/rashamall-logo.png';
import ProductCategoryNavButton from "@/components/ProductCategoryNavButton";
import { FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const mainCategories = categories.filter((category) => category.parent === null);

  const catIds = []
  
  categories.map((cat) => {
    const info = `${cat.slug} : ${cat._id}`
    catIds.push(info)
  })

  console.log(catIds)
  return (
    <nav className='border border-blue-400 flex justify-end'>
      <div className='w-full bg-blue-200 '>
        <div lang="fa" className='md:border-b md:border-blue-400 px-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-around items-center md:px-1 '>
          <div className="w-full px-2 md:flex md:flex-row-reverse md:justify-between md:items-center">
            <div className='w-full sm:flex sm:justify-around sm:gap-2 md:items-center md:justify-end md:gap-1 lg:gap-4 md:w-auto lg:w-2/3'>
              <div className="flex justify-around gap-6 my-4 sm:w-1/2 sm:my-2 sm:gap-2 md:w-auto md:my-0 md:justify-center md:gap-1 lg:gap-3 lg:w-1/2">
                <Link className="w-1/2 border border-gray-400 p-2 rounded text-xs text-center sm:text-center md:w-auto lg:w-1/2 md:text-end" href='/'>محصولات حراجی</Link>
                <Link className="w-1/2 border border-gray-400 p-2 rounded text-xs text-center sm:text-center md:w-auto lg:w-1/2 md:text-end" href='/'>مقایسه محصولات</Link>
              </div>
              <div className="flex justify-around gap-6 my-4 sm:w-1/2 sm:my-2 sm:gap-2 md:w-auto md:my-0 md:justify-center md:gap-1 lg:gap-3 lg:w-1/2">
                <Link className=" w-1/2 border border-gray-400 p-2 rounded text-xs text-center sm:text-center md:w-auto lg:w-1/2 md:text-end" href='/'>مجله راشامال</Link>
                <Link className=" w-1/2 border border-gray-400 p-2 rounded text-xs text-center sm:text-center md:w-auto lg:w-1/2 md:text-end" href='/'>تماس با ما</Link>
              </div>
            </div>
            <div className="border border-orange-300 flex justify-center p-2">contact</div>
          </div>
          {/* Logo */}
          <Link
            className="flex flex-shrink-0 bg-blue-200 items-center px-2 justify-center"
            href='/'
            onClick={() => setOpenDropdown(null)}
          >
            <Image
              className="h-20 w-auto bg-blue-200 sm:h-10 md:h-20"
              src={logo}
              alt="RashaMall"
              priority={true}
            />
          </Link>
        </div>

        <div className="flex justify-center items-center px-4 py-1 md:hidden">
          {/* Mobile menu button */}
          <div
            className="w-full justify-between px-4 relative border border-gray-400 flex py-2 rounded-lg focus:outline-none focus:bg-blue-300 focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <button
              className="mt-1 mr-2"
              aria-label="Toggle menu"
            >
              <FaChevronDown className="text-gray-400" />
            </button>
            <span>محصولات</span>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-menu">
            <div lang='fa' className='py-2 px-6 flex flex-col gap-2 md:hidden'>
              {mainCategories.map((category) => (
                <ProductCategoryNavButton
                  key={category._id}
                  category={category}
                  categories={categories}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  isMobileMenuOpen={isMobileMenuOpen}
                />
              ))}
            </div>
          </div>
        )}

        <div lang='fa' className="p-2 justify-center gap-1 hidden md:flex lg:gap-4">
          {mainCategories.slice().reverse().map((category) => (
            <ProductCategoryNavButton
              key={category._id}
              category={category}
              categories={categories}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
