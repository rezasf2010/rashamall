"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";

const AdminLogin = () => {
  // const auth = getAuth(); // Ensure auth is initialized
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Email or password is incorrect");
    }

    console.log(auth);
  };

  return (
    <div className="w-3/4">
      <h2 className="text-lg md:text-2xl text-center font-semibold mb-6">
        ورود به بخش مدیریت
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-start md:flex-row md:items-center justify-center">
          <label
            htmlFor="email"
            className="w-full md:w-1/4 pr-2 text-gray-700 font-bold mb-2"
          >
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded w-full md:w-3/4 py-2 px-3 mb-2 text-end"
            required
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex flex-col items-start md:flex-row md:items-center justify-center">
          <label
            htmlFor="password"
            className="w-full md:w-1/4 pr-2 text-gray-700 font-bold mb-2"
          >
            رمز عبور
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-300 rounded w-full md:w-3/4 py-2 px-3 mb-2 text-end"
            required
            value={user.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-center mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full w-3/4 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            ورود
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
