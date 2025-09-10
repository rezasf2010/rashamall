import React from 'react';
import Image from 'next/image';
import logo from '@/assets/images/rashamall-logo.png';
import SemiFooter from './SemiFooter';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-16">
      <SemiFooter />
      <footer className="bg-gray-200 p-4 w-full flex flex-col items-center md:flex-row md:gap-4">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-16 w-auto" priority={true} />
        </div>
        <div className="w-full px-4 flex flex-col items-center md:items-start">
          {' '}
          <h1 className="my-2 text-lg">فروشگاه اینترنتی راشامال</h1>
          <div className=" w-full flex md:flex-row items-center justify-between px-2">
            <div>
              <p className="flex  text-sm my-2">
                راشامال به عنوان یکی از قدیمی‌ترین فروشگاه های اینترنتی لوازم الکترونیک و لوازم
                خانگی، با پایبندی به شعار، تضمین اصل‌بودن کالا موفق شده است همگام با بزرگ ترین
                نمایندگی های فروش، به بزرگ‌ترین فروشگاه لوازم خانگی ایرانی از برند های معتبر جی
                پلاس، هایسنس، بیاند و دیگر برند های معتبر ایرانی تبدیل شود.
              </p>
              <p className="text-sm text-end text-gray-500 mt-2 md:mt-0">
                &copy; {currentYear} RashaMall. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
