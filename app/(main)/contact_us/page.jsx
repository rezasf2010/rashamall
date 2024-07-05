"use client";
import Link from "next/link";

const ContactUsPage = () => {
  return (
    <div className="mt-12 px-6 w-full md:w-4/5 flex flex-col items-center">
      <h1 className="flex text-3xl font-bold text-gray-700 border-b-2 border-gray-700 p-2 mr-4 w-fit">
        تماس با راشامال
      </h1>

      <div className="w-full border border-gray-300 shadow-lg mt-6 mx-8 p-4 rounded-2xl ">
        <h2 className="flex text-xl font-semibold text-gray-700 border-b-2 border-gray-700 p-2 mx-4 mb-4 w-fit">
          راه‌های ارتباط با ما
        </h2>
        <div className="flex flex-col mr-8 gap-4">
          <p className="">راشامال</p>
          <p className="">
            <span className="font-bold"> تلفن تماس: </span> 09126341339
          </p>
          <p className="">
            <span className="font-bold">واتساپ: </span> 09107240972
          </p>
          <p className="">
            <span className="font-bold">ایمیل: </span> support@rashamall.com
          </p>
        </div>
      </div>

      <div className="w-full border border-gray-300 shadow-lg mt-6 mx-8 p-4 rounded-2xl ">
        <h2 className="flex text-xl font-semibold text-gray-700 border-b-2 border-gray-700 p-2 mx-4 mb-4 w-fit">
          آدرس
        </h2>
        <p className="mr-8">تهران، نارمک، خ قاسم زاده، ورودی میدان 58</p>
      </div>

      <div className="w-full border border-gray-300 shadow-lg mt-6 mx-8 p-4 rounded-2xl ">
        <h2 className="flex text-xl font-semibold text-gray-700 border-b-2 border-gray-700 p-2 mx-4 mb-4 w-fit">
          ارتباط با شبکه‌های اجتماعی
        </h2>
        <ul>
          <li className="mr-8 mb-2">
            <Link href="/">اینستاگرام</Link>
          </li>
          <li className="mr-8 mb-2">
            <Link href="/">توییتر</Link>
          </li>
          <li className="mr-8 mb-2">
            <Link href="/">تلگرام</Link>
          </li>
        </ul>
      </div>

      <div className="w-full border border-gray-300 shadow-lg mt-6 mx-8 p-4 rounded-2xl ">
        <h2 className="flex text-xl font-semibold text-gray-700 border-b-2 border-gray-700 p-2 mx-4 mb-4 w-fit">
          ارسال پیام
        </h2>

        <form className="border border-blue-200 shadow-lg mx-8 p-3 rounded-lg flex flex-col items-center">
          <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center mb-4 w-full">
            <label
              htmlFor="name"
              className="p-2 font-bold text-gray-700  flex-shrink-0"
            >
              نام و نام خانوادگی:{" "}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 rounded-lg h-10 px-2 text-gray-700 w-full"
            />
          </div>
          <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center mb-4 w-full">
            <label htmlFor="email" className="p-2 font-bold text-gray-700">
              ایمیل:{" "}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-lg h-10 px-2 text-gray-700 w-full text-end"
            />
          </div>
          <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center mb-4 w-full">
            <label htmlFor="subject" className="p-2 font-bold text-gray-700">
              موضوع:{" "}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="border border-gray-300 rounded-lg h-10 px-2 text-gray-700 w-full"
            />
          </div>
          <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center mb-4 w-full">
            <label htmlFor="message" className="p-2 font-bold text-gray-700">
              پیام:{" "}
            </label>
            <textarea
              id="message"
              rows="4"
              name="message"
              className="border border-gray-300 rounded w-full py-2 px-3 resize-none text-gray-700"
            ></textarea>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-4/5 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
