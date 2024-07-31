"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ProvinceCitySelect from "./ProvinceCitySelect";
import PaymentInfo from "./PaymentInfo";
import axios from "axios";
import { set } from "mongoose";

const UserInfo = ({ customer, setCustomer }) => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isNewUser, setisNewUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobile: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: " ",
      zip: "",
    },
    details: "",
    paymentMethod: "",
    receiptImage: null,
  });

  useEffect(() => {
    setMounted(true);

    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await axios.get(`/api/users/${session.user.email}`);
          const user = response.data;

          if (!user) {
            setisNewUser(true);
          } else {
            setFormData({
              name: user.name || session.user.name,
              username: user.username || "",
              mobile: user.mobile || "",
              phone: user.phone || "",
              email: user.email || session.user.email,
              address: {
                street: user.address?.street || "",
                city: user.address?.city || "",
                state: user.address?.state || "",
                zip: user.address?.zip || "",
              },
              details: user.details || "",
              paymentMethod: user.paymentMethod || "",
              receiptImage: null,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  useEffect(() => {
    setCustomer(formData);
  }, [formData, setCustomer]);

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

  return (
    mounted && (
      <div>
        <div>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full p-2 border rounded"
                value={formData.name || ""}
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
              className="input-number mt-1 block w-full p-2 border rounded"
              value={formData.mobile || ""}
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
              className="input-number mt-1 block w-full p-2 border rounded"
              value={formData.phone || ""}
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
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 justify-center border border-gray-300 rounded-xl shadow-xl bg-blue-100 w-full">
            <ProvinceCitySelect formData={formData} setFormData={setFormData} />
            <div className="mb-6 col-span-2">
              <label htmlFor="street" className="block text-gray-700">
                آدرس
              </label>
              <input
                type="text"
                id="street"
                name="address.street"
                className="mt-1 w-full p-2 border rounded"
                value={formData.address.street || ""}
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
                className="input-number mt-1 block w-full p-2 border rounded"
                value={formData.address.zip || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
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
              value={formData.details || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <PaymentInfo formData={formData} setFormData={setFormData} />
      </div>
    )
  );
};

export default UserInfo;
