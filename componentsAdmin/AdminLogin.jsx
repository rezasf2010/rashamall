"use client";
import { useState, useEffect } from "react";

const AdminLogin = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [saveUser, setSaveUser] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSaveInfo = (e) => {
    const { checked } = e.target;
    setSaveUser(checked);
  };

  return (
    <div className="w-3/4">
      <h2 className="text-3xl text-center font-semibold mb-6">
        ورود به بخش مدیریت
      </h2>

      <div className="mb-4 flex items-center justify-center">
        <label
          htmlFor="username"
          className="w-1/4 pr-2 text-gray-700 font-bold mb-2"
        >
          نام کاربری
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="border border-gray-300 rounded w-3/4 py-2 px-3 mb-2 text-end"
          required
          value={user.username}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4 flex items-center justify-center">
        <label
          htmlFor="password"
          className="w-1/4 pr-2 text-gray-700 font-bold mb-2"
        >
          رمز عبور
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border border-gray-300 rounded w-3/4 py-2 px-3 mb-2 text-end"
          required
          value={user.password}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4 mr-6 flex gap-3 items-center">
        <input
          type="checkbox"
          id="save_user_info"
          name="save_user_info"
          value={user}
          className="mr-2"
          onChange={handleSaveInfo}
        />
        <label htmlFor="save_user_info">مرا به خاطر بسپار</label>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full w-3/4 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          ورود
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
