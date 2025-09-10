'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCartPlus } from 'react-icons/fa';
import profileDefault from '@/assets/images/profile.png';
import googleLogo from '@/assets/images/google-color-icon.png';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import CartCount from './CartCount';

const UserLoginMenu = ({ session, providers, isProfileMenuOpen, setIsProfileMenuOpen }) => {
  const router = useRouter();
  const profileImage = session?.user?.image;

  const handleSignOut = () => {
    setIsProfileMenuOpen(false);
    const redirectUrl = router.asPath || '/'; // Fallback to homepage if router.asPath is empty
    signOut({ callbackUrl: redirectUrl }); // Redirect to the previous page or homepage
  };

  return (
    <div className="">
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
                  <Image
                    className="h-6 w-6 rounded-full ml-2"
                    src={googleLogo}
                    width={6}
                    height={6}
                    alt=""
                    priority={true}
                  />
                  <span className="font-semibold">ورود / ثبت نام</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* <!-- Right Side Menu (Logged In) --> */}
      <div className="flex items-center md:static md:inset-auto md:ml-6 md:pr-0">
        <Link href="/" className="relative group"></Link>
        {/* <!-- Profile dropdown button --> */}
        {session && (
          <div className="relative">
            <div className="flex items-center gap-3">
              <Link href="/cart" className="relative group">
                <button
                  type="button"
                  className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <FaCartPlus className="h-5 w-5" />
                </button>
                <CartCount session={session} />
              </Link>
              <button
                type="button"
                className="relative rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <Image
                  className="h-8 w-8 rounded-full"
                  src={profileImage || profileDefault}
                  width={60}
                  height={60}
                  alt=""
                  priority={true}
                />
              </button>
            </div>

            {/* <!-- Profile dropdown --> */}
            {isProfileMenuOpen && (
              <div
                id="user-menu"
                className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                  }}
                >
                  پروفایل شما
                </Link>
                <Link
                  href="/profile/orders"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                  }}
                >
                  سفارش ها
                </Link>
                <Link
                  href="/products/saved"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                  }}
                >
                  کالا های ذخیره شده
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                >
                  خروج از حساب کاربری
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLoginMenu;
