"use client";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState, useEffect } from "react";

const CartProduct = ({ product, quantity }) => {
  const { updateCart } = useGlobalContext();
  const [productQuantity, setProductQuantity] = useState(quantity);

  useEffect(() => {
    setProductQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setProductQuantity(newQuantity);
    updateCart(product._id, newQuantity);
  };

  const discountedPrice = product.is_onSale
    ? Math.ceil(product.price - (product.price * product.discount) / 100)
    : Math.ceil(product.price);

  const unitPrice = product.is_onSale ? discountedPrice : product.price;

  const totalPrice = unitPrice * productQuantity;

  return (
    <div className=" text-gray-700 mb-4 flex items-center gap-6 border border-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
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
          <input
            type="number"
            value={productQuantity}
            min="0"
            onChange={handleQuantityChange}
            className="w-16 p-1 border rounded text-center"
          />
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
