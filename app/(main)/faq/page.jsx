import React from "react";

const FAQPage = () => {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="w-full lg:w-11/12 flex p-2 md:p-4 text-gray-700 text-lg md:text-2xl font-bold border-b-2 border-blue-500 mb-6">
        سوالات متداول
      </h1>

      <div className="w-full lg:w-11/12">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            چطور اطمینان پیدا کنم؟
          </h2>
          <p className="text-gray-600 leading-relaxed">
            تمامی فعالیت‌های راشا مال قانونی و منطبق بر قوانین تجارت الکترونیک،
            انجام می‌گیرد؛ بنابراین می‌توانید با خیالی آسوده، لوازم خانگی و
            کالاهای دیجیتال مورد نیاز خود را از طریق فروشگاه اینترنتی راشا مال
            خریداری کنید.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            چطور سفارش خود را ثبت کنم؟
          </h2>
          <p className="text-gray-600 leading-relaxed">
            برای ثبت سفارش خود، پس از انتخاب محصولات مد نظر، گزینه افزودن به سبد
            خرید را انتخاب کرده و در نهایت پس از محاسبه جمع هزینه‌ها با کلیک بر
            روی گزینه تسویه حساب، صفحه ای جهت تکمیل اطلاعات مورد نیاز اعم از
            نام، نام خانوادگی و … مقابل رویتان قرار خواهد گرفت که لازم است جهت
            ارسال کالا توسط راشا مال به خریداران، تمامی آن‌ها را به دقت تکمیل و
            از صحت آن‌ها اطمینان حاصل کرده، سپس نسبت به پرداخت هزینه اقدام و در
            نهایت روی گزینه ثبت سفارش، کلیک کنید.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            سفارش چگونه برای من ارسال می‌شود؟
          </h2>
          <p className="text-gray-600 leading-relaxed">
            تمامی کالاها توسط پست پیشتاز برای خریداران، ارسال می‌گردد.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            راه‌های پرداخت هزینه‌های سفارشات چیست؟
          </h2>
          <p className="text-gray-600 leading-relaxed">
            تمامی هزینه‌های مربوط به خرید از فروشگاه اینترنتی راشا مال از طریق
            درگاه بانکی و به صورت اینترنتی و امن انجام می‌گیرد.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            شرایط بازگرداندن کالا چیست؟
          </h2>
          <p className="text-gray-600 leading-relaxed">
            تا 7 روز پس از خرید کالا، امکان انصراف از خرید، تحت یک سری شرایط،
            وجود دارد؛ انصراف از خرید تنها به کالاهایی که از بسته بندی اصلی خود
            خارج نشده باشند، تعلق می‌گیرد.
          </p>
          <p className="text-gray-600 leading-relaxed">
            لازم به ذکر است که کالاهایی که با گارانتی رسمی، عرضه می‌شوند شامل
            هفت روز مهلت تست و استرداد نخواهند بود.
          </p>
          <p className="text-gray-600 leading-relaxed">
            جهت اطلاع از شرایط دقیق بازگردانی کالا، پیشنهاد می‌کنیم صفحه قوانین
            و مقررات استرداد را مطالعه کنید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
