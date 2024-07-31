"use client";
import { useState, useEffect } from "react";
import SpinnerH from "@/components/SpinnerH";
import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [customer, setCustomer] = useState({});
  const { cart, clearCart } = useGlobalContext();
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setUserId(session.user.id); // Assuming session.user contains the user id
    }
    setLoading(false);
  }, [session]);

  const handleAddToOrders = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderItems = Object.keys(cart).map((productId) => {
      const quantity = Number(cart[productId].quantity);
      const price = Number(cart[productId].price);

      return {
        product: productId,
        quantity: quantity,
        price: price,
        totalPrice: quantity * price,
      };
    });

    const totalQuantity = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );

    const formData = new FormData();
    formData.append("user", userId);
    formData.append("items", JSON.stringify(orderItems));
    formData.append("totalQuantity", totalQuantity);
    formData.append("totalAmount", totalAmount);
    formData.append("details", customer.details || "");
    formData.append("paymentMethod", customer.paymentMethod || "");
    formData.append("receiptImage", customer.receiptImage || "");
    formData.append("isNewOrder", true);

    try {
      const response = await axios.post("/api/orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success("سفارش شما با موفقیت ثبت شد");
        clearCart(); // Clear the cart after placing the order
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("ثبت سفارش انجام نشد");
    }

    // Trigger form submission
    document.getElementById("orderForm").submit();

    setLoading(false);
  };

  return (
    <div className=" w-11/12 mx-auto">
      <div className="py-8 px-12 border border-gray-300 shadow-xl bg-blue-50 rounded-xl mt-4">
        <h1 className="text-2xl font-bold mb-4">اطلاعات شخصی</h1>

        <form
          id="orderForm"
          action="/api/users"
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col"
        >
          <UserInfo setCustomer={setCustomer} customer={customer} />
          <button
            type="submit"
            className="bg-blue-500 text-white min-h-9 py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleAddToOrders}
          >
            {loading ? <SpinnerH loading={loading} /> : "ثبت سفارش"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
