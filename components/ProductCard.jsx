import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div
      lang="fa"
      className="rounded-xl shadow-lg relative mx-8 max-w-96 border border-red-500"
    >
      <Image
        src={product.images[0]}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
        priority={true}
      />
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-xl font-bold md:text-sm lg:text-xl">
            {product.name}
          </h3>
        </div>
        {product._stock_status === "in stock" ? (
          <div
            className={`absolute top-[10px] right-[10px] flex justify-center items-center gap-6 px-4 py-2 rounded-lg font-bold text-center md:text-center lg:text-right bg-blue-50 text-blue-500`}
          >
            <p>موجود</p>
          </div>
        ) : (
          <div
            className={` absolute top-[10px] right-[10px] flex justify-center items-center gap-6 px-4 py-2 rounded-lg font-bold text-center md:text-center lg:text-right bg-red-50 text-red-500`}
          >
            <p>ناموجود</p>
          </div>
        )}

        <div className="text-end font-bold text-green-900 mb-4">
          {product.price.toLocaleString()}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <Link
            href={`/products/${product.main_category}/${product.sub_category}/${product._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            جزییات محصول
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
