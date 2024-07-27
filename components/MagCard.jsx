import React from "react";
import Image from "next/image";
import Link from "next/link";
import image from "@/assets/images/infoBox1.jpg";

const MagCard = ({ post }) => {
  return (
    <div className="bg-gray-50 w-96 min-h-80 p-2 md:w-80 lg:w-96 md:h-[24rem] rounded-xl shadow-2xl relative border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="w-full h-auto md:h-2/3 flex rounded-t-xl justify-center items-center">
          <Image
            src={post.images[0]}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full md:h-full rounded-t-xl object-contain py-2 lg:py-0 mb-4"
            priority={true}
          />
        </div>

        <div className="relative px-4 py-2 flex flex-col md:h-1/3">
          <h3 className="text-xs mb-2 font-[600] md:text-sm lg:text-base">
            {post.mainTitle}
          </h3>
          <div className="text-end text-xs md:text-sm font-[500] text-green-900 mb-4"></div>
        </div>
      </div>
      <div className="md:absolute md:bottom-3 md:left-4 flex flex-col lg:flex-row justify-end">
        <Link
          href={`/rashamall-mag/${post._id}`}
          className="h-6 md:h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 md:py-2 rounded-lg text-center text-xs md:text-sm"
        >
          بیشتر بخوانید ...
        </Link>
      </div>
    </div>
  );
};

export default MagCard;
