"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ProvinceCitySelect from "./ProvinceCitySelect";
import PaymentInfo from "./PaymentInfo";

const UserInfo = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    mobile: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: " ",
      zipcode: "",
    },
    details: "",
    paymentMethod: "",
    receiptImage: null,
  });

  useEffect(() => {
    setMounted(true);

    if (session?.user?.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: session.user.email,
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if nested property
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");

      setFormData((prevFromData) => ({
        ...prevFromData,
        [outerKey]: {
          ...prevFromData[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      // Not nested
      setFormData((prevFromData) => ({
        ...prevFromData,
        [name]: value,
      }));
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission, e.g., send data to the server
  //   console.log(formData);
  // };

  return (
    mounted && (
      <div className="py-8 px-12 border border-gray-300 shadow-xl bg-blue-50 rounded-xl mt-4">
        <h1 className="text-2xl font-bold mb-4">اطلاعات شخصی</h1>
        <form
          action="/api/users"
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col"
        >
          {!session && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700">
                    نام
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full p-2 border rounded"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-700">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 block w-full p-2 border rounded"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="username" className="block text-gray-700">
                    نام کاربری
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 block w-full p-2 border rounded text-end"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="mobile" className="block text-gray-700">
                  تلفن همراه (با اعداد انگلیسی)
                </label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  className="mt-1 block w-full p-2 border rounded"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700">
                  تلفن (با اعداد انگلیسی)
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full p-2 border rounded"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full p-2 border rounded text-end"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 justify-center border border-gray-300 rounded-xl shadow-xl bg-blue-100 w-full">
                <ProvinceCitySelect
                  formData={formData}
                  setFormData={setFormData}
                />
                <div className="mb-6 col-span-2">
                  <label htmlFor="street" className="block text-gray-700">
                    آدرس
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="address.street"
                    className="mt-1 w-full p-2 border rounded"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6 col-span-2">
                  <label htmlFor="zip" className="block text-gray-700">
                    کدپستی (بدون فاصله و با اعداد انگلیسی)
                  </label>
                  <input
                    type="number"
                    id="zip"
                    name="address.zip"
                    className="mt-1 block w-full p-2 border rounded"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label htmlFor="details" className="block text-gray-700">
                توضیحات تکمیلی
              </label>
              <textarea
                id="details"
                name="details"
                rows="4"
                className="mt-1 block w-full p-2 border rounded resize-none"
                value={formData.details}
                onChange={handleChange}
              />
            </div>
          </div>
          <PaymentInfo formData={formData} setFormData={setFormData} />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            ثبت سفارش
          </button>
        </form>
      </div>
    )
  );
};

export default UserInfo;
