import Link from "next/link";
import ContactUsIcons from "@/components/ContactUsIcons";
// import MessageForm from "@/components/MessageForm";

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
        <div className="flex justify-center">
          <ContactUsIcons />
        </div>
      </div>

      <div className="w-full border border-gray-300 shadow-lg mt-6 mx-8 p-4 rounded-2xl ">
        <h2 className="flex text-xl font-semibold text-gray-700 border-b-2 border-gray-700 p-2 mx-4 mb-4 w-fit">
          ارسال پیام
        </h2>

        {/* <MessageForm /> */}
      </div>
    </div>
  );
};

export default ContactUsPage;
