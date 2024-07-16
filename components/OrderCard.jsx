import Image from "next/image";
import Link from "next/link";
import image from "@/assets/images/profile.png";

const OrderCard = () => {
  const totalPrice = 1000000;

  return (
    <div className=" text-gray-700 mb-4 flex items-center gap-6 border border-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
      <Image
        src={image}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-32 h-32 md:w-44 md:h-44 rounded-t-xl object-contain py-2 lg:py-0"
        priority={true}
      />
      <div className=" w-full">
        <div className="info mb-3 w-full">
          <div className="p-2 w-full flex justify-between mb-3">
            <div className="font-bold">
              شماره فاکتور :{"   "}
              <span className="px-1 border-b border-gray-700 text-center ">
                3
              </span>
            </div>

            <div className="font-bold ">
              تاریخ :{"   "}
              <span className="px-1 text-center ">1403/4/15</span>
            </div>
          </div>

          <div className="font-bold mb-3 ">
            تعداد کالاها :{"   "}
            <span className="px-1 text-center ">3</span>
          </div>

          <div className="mb-2">
            <span className="font-bold">مجموع قیمت :</span>
            {"  "}
            {totalPrice.toLocaleString()}
            {"  "}
            <span>تومان</span>
          </div>
        </div>
        <div className="m-2 flex justify-end">
          <Link
            href={`/profile/orders/test`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-center text-xs md:text-sm"
          >
            جزییات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
