import React from "react";
import Image from "next/image";
import logo from "@/assets/images/rashamall-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 p-4 mt-16 w-full">
      <h1 lang="fa" className="my-2 text-lg">
        فروشگاه اینترنتی راشامال
      </h1>
      <div className=" flex items-center">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-16 w-auto" />
        </div>
        <div className="container mx-auto flex md:flex-row items-center justify-between px-4">
          <div>
            <p lang="fa" className="flex  text-sm my-2">
              راشامال به عنوان یکی از قدیمی‌ترین فروشگاه های اینترنتی لوازم
              الکترونیک و لوازم خانگی، با پایبندی به شعار، تضمین اصل‌بودن کالا
              موفق شده است همگام با بزرگ ترین نمایندگی های فروش، به بزرگ‌ترین
              فروشگاه لوازم خانگی ایرانی از برند های معتبر جی پلاس، هایسنس،
              بیاند و دیگر برند های معتبر ایرانی تبدیل شود.
            </p>
            <p className="text-sm text-end text-gray-500 mt-2 md:mt-0">
              &copy; {currentYear} RashaMall. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
