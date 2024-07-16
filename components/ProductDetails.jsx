import Image from "next/image";
import SpecificationCard from "./SpecificationCard";
import ProductImages from "./ProductImages";
import { FaTimes, FaCheck } from "react-icons/fa";
import AddToCart from "./AddToCart";

const ProductDetails = ({ product }) => {
  const discountedPrice = product.is_onSale
    ? Math.ceil(product.price - (product.price * product.discount) / 100)
    : Math.ceil(product.price);

  return (
    <>
      <div className="relative flex flex-col mt-4 items-center border-b border-gray-400 pb-4 lg:flex-row lg:items-start">
        {product.is_onSale && (
          <div className="absolute top-0 left-0  bg-red-500 text-white pl-6 pr-10 py-2 rounded-tr-xl rounded-bl-xl text-xl font-bold">
            SALE
          </div>
        )}
        <div className=" flex flex-col items-center md:flex-row md:justify-between md:w-full md:gap-6 lg:w-auto lg:gap-0 ">
          <div className="w-2/3 md:w-1/2 lg:w-1/3">
            <ProductImages images={product.images} />
          </div>
          <div className=" flex-grow md:w-1/2 lg:w-2/5 py-2 px-4">
            <h1 className="text-xl font-bold mb-6 md:text-base md:font-semibold lg:text-xl lg:font-bold">
              {product.name}
            </h1>
            <p className="mb-4 font-semibold">ویژگی ها:</p>
            <div className="flex gap-3 flex-wrap md:flex-col lg:flex-row">
              {product.specifications.slice(0, 5).map((spec, index) => (
                <SpecificationCard key={index} spec={spec} />
              ))}
            </div>
          </div>
        </div>
        <div className=" px-4 py-2 flex flex-col flex-grow w-full lg:w-2/5">
          <div className="text-xl font-semibold mb-6">
            <span>قیمت: </span>
            {product.is_onSale ? (
              <div className="flex flex-col">
                <span className="line-through text-gray-700">
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
          <div className="flex flex-col sm:flex-row justify-between lg:flex-col lg: gap-4">
            {product._stock_status === "in stock" ? (
              <div
                className={`flex justify-center items-center gap-6 px-4 py-2 rounded-lg font-bold text-center bg-blue-50 text-blue-500`}
              >
                <p>موجود</p>
                <FaCheck className="inline-block text-blue-500" />
              </div>
            ) : (
              <div
                className={`flex justify-center items-center gap-6 px-4 py-2 rounded-lg font-bold text-center bg-red-50 text-red-500`}
              >
                <p>ناموجود</p>
                <FaTimes className="inline-block text-red-500" />
              </div>
            )}
            <AddToCart productId={product._id} price={discountedPrice} />
          </div>
          <p className="text-orange-500 my-6">
            لطفا برای خرید محصول با ما تماس بگیرید
          </p>
          <p className="font-semibold">(پرداخت درب منزل برای شهر تهران)</p>
        </div>
      </div>
      <section className="my-6 ">
        {product.description && (
          <div className="border-b border-gray-400 mb-4 p-4">
            <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
              معرفی
            </h3>
            <p>{product.description}</p>
          </div>
        )}

        {product.specifications.length !== 0 && (
          <div className="border-b border-gray-400 mb-4 p-4">
            <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
              مشخصات
            </h3>
            <ul>
              {product.specifications.map((spec, index) => (
                <li key={index} className="mb-2">
                  <span className="font-bold">{spec.key}: </span>
                  {spec.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.features.length !== 0 && (
          <div className="border-b border-gray-400 mb-4 p-4">
            <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
              امکانات
            </h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.services.length !== 0 && (
          <div className="border-b border-gray-400 mb-4 p-4">
            <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
              خدمات
            </h3>
            <ul>
              {product.services.map((service, index) => (
                <li key={index} className="mb-2">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.comments.length !== 0 && (
          <div className="border-b border-gray-400 mb-4 p-4">
            <h3 className="flex pr-2 text-gray-700 font-bold mb-2 pb-2 border-b-2 border-blue-500">
              نظرات
            </h3>
            <div>comments section</div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
