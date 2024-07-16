import React from "react";

const OrderPage = () => {
  const totalCartPrice = 100000000;

  // const totalCartPrice = cartProducts.reduce((total, product) => {
  //   const unitPrice = product.is_onSale
  //     ? Math.ceil(product.price - (product.price * product.discount) / 100)
  //     : Math.ceil(product.price);
  //   return total + unitPrice * cart[product._id];
  // }, 0);
  return (
    <div className="w-full my-12 px-6 flex flex-col lg:flex-row gap-4 items-center lg:items-start justify-center">
      <div className="top right w-full lg:w-2/3">
        <div className="border border-gray-300 bg-blue-50 w-full md:w-full p-4 rounded-2xl shadow-2xl">
          <h4 className="font-bold text-lg mb-4">جزییات سفارش شما</h4>
          product
          {/* {cartProducts.map((product) => (
              <CartProduct
                key={product._id}
                product={product}
                quantity={cart[product._id]}
              />
            ))} */}
        </div>
      </div>
      <div className=" top left sum w-full lg:w-1/3">
        <div className="border border-gray-300 bg-blue-50 w-full md:w-full p-4 rounded-2xl shadow-2xl">
          <h4 className="font-bold text-lg mb-4">جمع کل سبد خرید</h4>
          <span className="font-bold">مجموع : </span> {"  "}
          {totalCartPrice.toLocaleString()}
          {"  "}
          <span>تومان</span>
        </div>
        <div className="flex justify-center mt-4 ">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full"
            // onClick={handleNext}
          >
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
