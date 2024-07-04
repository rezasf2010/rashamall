import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const discountedPrice = product.is_onSale
    ? Math.ceil(product.price - (product.price * product.discount) / 100)
    : Math.ceil(product.price);

  return (
    <div
      lang="fa"
      className="bg-gray-50 w-96 md:w-80 h-[36rem] md:h-[32rem] lg:h-[40rem] lg:w-72 hxlg:w-80 2xl:w-96 rounded-xl shadow-2xl relative border border-gray-200 flex flex-col"
    >
      <div className="w-full h-2/3 flex rounded-t-xl justify-center items-center">
        <Image
          src={product.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full rounded-t-xl object-contain"
          priority={true}
        />
      </div>
      {product.is_onSale && (
        <div className="absolute top-2 left-0 bg-red-500 text-white px-4 py-1 rounded-tr-xl rounded-br-xl font-bold">
          SALE
        </div>
      )}
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
      <div className="relative px-4 flex flex-col h-1/3">
        <div className="mb-2">
          <h3 className="text-lg font-semibold md:text-sm lg:text-lg">
            {product.name}
          </h3>
        </div>

        <div className="text-end font-bold text-green-900 mb-4">
          {product.is_onSale ? (
            <div className="flex flex-col">
              <span className="line-through text-green-900">
                {Math.ceil(product.price).toLocaleString()} تومان
              </span>
              <span className="text-red-400">
                {" "}
                {discountedPrice.toLocaleString()} تومان
              </span>
            </div>
          ) : (
            product.price.toLocaleString() + " تومان"
          )}
        </div>

        <div className="border border-gray-200 mb-2"></div>

        <div className="absolute bottom-3 flex flex-col lg:flex-row justify-between">
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
