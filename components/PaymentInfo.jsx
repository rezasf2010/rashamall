import { useState } from "react";

const PaymentInfo = ({ formData, setFormData }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [receiptImage, setReceiptImage] = useState(null);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleFileChange = (e) => {
    setReceiptImage(e.target.files[0]);
    setFormData({ ...formData, receiptImage: e.target.files[0] });
  };

  return (
    <div className="my-4 p-4 border border-gray-300 shadow-xl bg-gray-100 rounded-xl">
      <h2 className="text-xl font-bold mb-4">روش پرداخت</h2>
      <div className="mb-4">
        <label className="text-gray-700 flex gap-3 items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="payAtPlace"
            checked={paymentMethod === "payAtPlace"}
            onChange={handlePaymentChange}
          />
          <span className="ml-2">پرداخت در محل</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="text-gray-700 flex gap-3 items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="cardToCard"
            checked={paymentMethod === "cardToCard"}
            onChange={handlePaymentChange}
          />
          <span className="ml-2">پرداخت از طریق کارت به کارت</span>
        </label>
      </div>
      {paymentMethod === "cardToCard" && (
        <div className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">
              شماره کارت: 1234-5678-9012-3456
            </label>
          </div>
          <div>
            <label htmlFor="receiptImage" className="block text-gray-700">
              بارگذاری تصویر رسید
            </label>
            <input
              type="file"
              id="receiptImage"
              name="receiptImage"
              className="mt-1 block w-full p-2 border rounded"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
