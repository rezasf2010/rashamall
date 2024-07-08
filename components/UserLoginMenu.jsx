import Link from "next/link";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import profileDefault from "@/assets/images/profile.png";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const UserLoginMenu = ({ session, providers }) => {
  return (
    <div className="border-3 border-red-500">
      {/* <!-- Right Side Menu (Logged Out) --> */}
      {!session && (
        <div className="md:block md:ml-6">
          <div className="flex items-center">
            {providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  key={index}
                  className=" border border-gray-400 flex items-center text-gray-700 hover:bg-gray-300 hover:text-gray-700 rounded-md px-3 py-2"
                  onClick={() => signIn(provider.id)}
                >
                  <FaGoogle className="text-gray-500 ml-2" />
                  <span className="font-semibold">ورود / ثبت نام</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* <!-- Right Side Menu (Logged In) --> */}
      <div className="flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
        <Link href="/" className="relative group"></Link>
        {/* <!-- Profile dropdown button --> */}
        <div className="relative hidden">
          <div>
            <button
              type="button"
              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <Image
                className="h-8 w-8 rounded-full"
                src={profileDefault}
                alt=""
              />
            </button>
          </div>

          {/* <!-- Profile dropdown --> */}
          <div
            id="user-menu"
            className="hidden mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex="-1"
          >
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-0"
            >
              پروفایل شما
            </Link>
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-2"
            >
              کالا های ذخیره شده
            </Link>
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-2"
            >
              خروج از حساب کاربری
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginMenu;
