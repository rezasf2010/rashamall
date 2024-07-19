"use client";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const CartProduct = ({ product, quantity }) => {
  const { updateCart } = useGlobalContext();
  const [productQuantity, setProductQuantity] = useState(quantity);
  const pathname = usePathname();

  useEffect(() => {
    setProductQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) {
      setProductQuantity(newQuantity);
      updateCart(product._id, newQuantity, product.price);
    }
  };

  const handleInputChange = (e) => {
    const newQuantity = Number(e.target.value);
    handleQuantityChange(newQuantity);
  };

  const handleIncrease = () => {
    handleQuantityChange(productQuantity + 1);
  };

  const handleDecrease = () => {
    handleQuantityChange(productQuantity - 1);
  };

  const discountedPrice = product.is_onSale
    ? Math.ceil(product.price - (product.price * product.discount) / 100)
    : Math.ceil(product.price);

  const unitPrice = product.is_onSale ? discountedPrice : product.price;

  const totalPrice = unitPrice * productQuantity;

  return (
    <div className="text-gray-700 mb-4 flex items-center gap-6 border border-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
      <Link href={`/products/1/1/${product._id}`} className="image">
        <Image
          src={product.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 h-32 md:w-44 md:h-44 rounded-t-xl object-contain py-2 lg:py-0"
          priority={true}
        />
      </Link>
      <div className="info">
        <div className="font-bold mb-2 ">{product.name}</div>
        <div className="mb-2">
          <span className="font-bold">قیمت : </span> {"  "}
          {unitPrice.toLocaleString()}
          {"  "}
          <span>تومان</span>
        </div>
        <div className="flex items-center mb-2 gap-2">
          <span className="font-bold">تعداد : </span>
          {"  "}
          {pathname === "/order_success" ? (
            <div className="w-12 p-1 bg-gray-100 border border-gray-300 rounded text-center">
              {productQuantity}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={handleDecrease}
                className="border border-gray-300 bg-gray-200 p-1 w-7 h-7 text-xl rounded flex items-center justify-center"
              >
                -
              </button>
              <input
                type="number"
                value={productQuantity}
                min="0"
                onChange={handleInputChange}
                className="input-number w-12 p-1 border border-gray-300 rounded text-center"
              />
              <button
                onClick={handleIncrease}
                className="border border-gray-300 bg-gray-200 p-1 w-7 h-7 text-xl rounded flex items-center justify-center"
              >
                +
              </button>
            </div>
          )}
        </div>
        <div className="mb-2">
          <span className="font-bold">مجموع :</span>
          {"  "}
          {totalPrice.toLocaleString()}
          {"  "}
          <span>تومان</span>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
