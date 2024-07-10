"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [loading, setLoading] = useState(false);

  return (
    <section className="bg-blue-50 w-full">
      <div className="w-full m-auto py-24 ">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">حساب کاربری</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-full mx-20 mt-10 flex flex-col-reverse md:flex-row justify-between">
              <div>
                <h2 className="text-xl mb-8">
                  <span className="font-bold">نام : </span>
                  {"  "}
                  {profileName}
                </h2>
                <h2 className="text-xl mb-8">
                  <span className="font-bold">ایمیل :</span>
                  {"  "}
                  {profileEmail}
                </h2>
                <h2 className="text-xl mb-8">
                  <span className="font-bold">تلفن :</span>
                  {"  "}
                  (تلفن)
                </h2>
                <h2 className="text-xl mb-8">
                  <span className="font-bold">آدرس :</span>
                  {"  "}
                  (آدرس)
                </h2>
                <h2 className="text-xl mb-8">
                  <span className="font-bold">تاریخ تولد :</span>
                  {"  "}
                  (تاریخ تولد)
                </h2>
              </div>
              <div className="mb-8">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  width={100}
                  height={100}
                  alt="User"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
