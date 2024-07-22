"use client";
import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "" });
  const [saveUser, setSaveUser] = useState(false);
  const [providers, setProviders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.username === "admin" && user.password === "admin") {
      router.push("/admin/dashboard");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="w-3/4">
      <h2 className="text-lg md:text-2xl text-center font-semibold mb-6">
        ورود به بخش مدیریت
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-start md:flex-row md:items-center justify-center">
          <label
            htmlFor="username"
            className="w-full md:w-1/4 pr-2 text-gray-700 font-bold mb-2"
          >
            نام کاربری
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="border border-gray-300 rounded w-full md:w-3/4 py-2 px-3 mb-2 text-end"
            required
            value={user.username}
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

      {!session && (
        <div className="w-full flex justify-center">
          <div className="flex items-center w-3/4 justify-center">
            {providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  key={index}
                  className="border border-gray-400 flex items-center justify-center w-full text-gray-700 hover:bg-gray-300 hover:text-gray-700 rounded-md px-3 py-2"
                  onClick={() =>
                    signIn(provider.id, { callbackUrl: "/admin/dashboard" })
                  }
                >
                  <FaGoogle className="text-gray-500 ml-2" />
                  <span className="font-semibold">ورود / ثبت نام</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
