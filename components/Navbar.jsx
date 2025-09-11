'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/rashamall-logo.png';
import ProductCategoryNavButton from '@/components/ProductCategoryNavButton';
import UserLoginMenu from './UserLoginMenu';
import { fetchCategories } from '@/utils/requests';
import SpinnerH from './SpinnerH';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import ContactUsIcons from './ContactUsIcons';
import { useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  const mainCategories = categories
    .filter((category) => category.parent === null)
    .sort((a, b) => a._id.localeCompare(b._id));

  // Scroll event to hide the specific div
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        // You can adjust the scroll threshold (50) to your preference
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border border-blue-400 flex w-full">
      <div className="w-full bg-blue-200 ">
        <div
          className={`md:border-b md:border-blue-400 px-4 flex flex-col sm:flex-row gap-2 sm:justify-around items-center md:px-1 transition-all duration-500 ease-in-out ${
            hideOnScroll ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'
          }`}
        >
          {/* Logo */}
          <Link
            className="flex flex-shrink-0 bg-blue-200 items-center px-2 justify-center"
            href="/"
            onClick={() => {
              setOpenDropdown(null);
              setIsMobileMenuOpen(false);
            }}
          >
            <Image
              className="h-20 w-auto bg-blue-200 sm:h-10 md:h-20"
              src={logo}
              alt="RashaMall"
              priority={true}
            />
          </Link>
          <div className="w-full px-2 lg:flex lg:flex-row lg:justify-between lg:items-center">
            <div className="w-full sm:flex sm:gap-2 md:gap-1 md:items-center lg:gap-3 xl:gap-4 md:w-full sm:justify-center lg:w-2/3">
              <div className="flex justify-around gap-6 my-4 sm:my-2 sm:gap-2 md:my-2 md:justify-around lg:justify-around md:gap-1 lg:gap-3 sm:w-1/4">
                <Link
                  className="w-full border border-gray-400 p-2 rounded text-xs text-center sm:text-center"
                  href="/onsale"
                >
                  کالاهای حراجی
                </Link>
                {/* <Link
                  className="w-1/2 border border-gray-400 p-2 rounded text-xs text-center sm:text-center"
                  href="/comparison"
                >
                  مقایسه کالاها
                </Link> */}
              </div>
              <div className="flex justify-around gap-6 my-4 sm:w-1/2 sm:my-2 sm:gap-2 md:my-2 md:justify-around lg:justify-around md:gap-1 lg:gap-3 md:w-1/2">
                <Link
                  className=" w-1/2 border border-gray-400 p-2 rounded text-xs text-center sm:text-center"
                  href="/rashamall-mag"
                >
                  مجله راشامال
                </Link>
                <Link
                  className=" w-1/2 border border-gray-400 p-2 rounded text-xs text-center sm:text-center"
                  href="/contact_us"
                >
                  تماس با ما
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/3 flex justify-around items-center py-2">
              <div className="flex items-center">
                <ContactUsIcons />
              </div>
              <div className="flex justify-center">
                <UserLoginMenu
                  session={session}
                  providers={providers}
                  setProviders={setProviders}
                  isProfileMenuOpen={isProfileMenuOpen}
                  setIsProfileMenuOpen={setIsProfileMenuOpen}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center px-4 py-1 md:hidden">
          {/* Mobile menu button */}
          <div className="w-full justify-between px-4 relative border border-gray-400 flex py-2 rounded-lg focus:outline-none focus:bg-blue-300 focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800">
            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
              همه کالاها
            </Link>
            <button
              className="mt-1 mr-2"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {loading ? (
                <SpinnerH loading={loading} />
              ) : !isMobileMenuOpen ? (
                <FaChevronLeft className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && !loading && (
          <div id="mobile-menu">
            <div className="py-2 px-6 flex flex-col gap-2 md:hidden">
              {mainCategories.map((category) => (
                <ProductCategoryNavButton
                  key={category._id}
                  category={category}
                  categories={categories}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
              ))}
            </div>
          </div>
        )}

        <div className="p-2 justify-center gap-1 hidden md:flex flex-row-reverse lg:gap-4">
          {loading ? (
            <SpinnerH loading={loading} />
          ) : (
            mainCategories
              .slice()
              .reverse()
              .map((category) => (
                <ProductCategoryNavButton
                  key={category._id}
                  category={category}
                  categories={categories}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
              ))
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
