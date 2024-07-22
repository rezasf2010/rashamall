"use client";
import { useState, useEffect } from "react";
import { fetchUsers } from "@/utils/requests";
import UserCard from "@/componentsAdmin/UserCard";
import { UserCardSkeleton } from "@/ui/skeletons";
import { toast } from "react-toastify";

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const users = await fetchUsers();

        setUsers(users);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("آیا از حذف این کاربر اطمینان دارید؟");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId),
        );
        toast.success("کاربر با موفقیت حذف شد");
      } else {
        toast.error("مشکل در حذف کاربر");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("مشکل در حذف کاربر");
    }
  };

  return (
    <div className=" w-full gap-4 flex flex-col items-center">
      <div className="w-11/12 m-1 md:m-auto">
        <div className="bg-white min-h-3/4 flex flex-col items-center px-2 sm:px-4 py-4 md:px-6 mb-4 shadow-md rounded-md border">
          <h2 className="text-lg md:text-3xl text-center font-semibold mb-6">
            لیست کاربران
          </h2>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <UserCardSkeleton key={index} />
              ))
            : users.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onDelete={handleDeleteUser}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default UsersListPage;
