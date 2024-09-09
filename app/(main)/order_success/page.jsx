"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const OrderSuccessPage = () => {
  const [secondsLeft, setSecondsLeft] = useState(20);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    if (secondsLeft === 0) {
      clearInterval(timer);
      router.push("/");
    }

    return () => clearInterval(timer);
  }, [secondsLeft, router]);

  const handleReturnHome = () => {
    router.push("/"); // Change this to your actual next step route
  };

  return (
    <div className="w-full my-12 px-6 flex flex-col  items-center justify-center">
      <h2 className="font-bold text-xl text-green-700 text-center mb-6">
        با سپاس از خرید شما
      </h2>
      <h2 className="font-bold text-xl text-green-700 text-center mb-6">
        سفارش شما با موفقیت ثبت شد. به زودی با شما تماس می گیریم ...
      </h2>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold flex items-center gap-6 py-2 px-6 rounded-full"
        onClick={handleReturnHome}
      >
        بازگشت به صفحه اصلی
        <span className="text-sm">{secondsLeft}</span>
      </button>
    </div>
  );
};

export default OrderSuccessPage;
