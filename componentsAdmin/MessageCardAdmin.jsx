"use client";
import { useState, useEffect } from "react";
import { convertToJalaali } from "@/utils/calenderConvert";
import { fetchUsers } from "@/utils/requests";
import { MessageCardSkeleton } from "@/ui/skeletons";
import { useAdminGlobalContext } from "@/context/AdminGlobalContext";
import { toast } from "react-toastify";
import Link from "next/link";

const MessageCardAdmin = ({ message, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMessageNew, setIsMessageNew] = useState(!message.read);

  const { setNewMessageCount } = useAdminGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <MessageCardSkeleton />;
  }

  const persianDateAndTime = convertToJalaali(message.updatedAt);
  const user = users.find((user) => user._id === message.sender);

  // Ensure user exists before accessing its properties
  const userName = user?.name || "Unknown";

  const handelOpenClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { isNewMessage } = await res.json();
        setIsMessageNew(isNewMessage);
        setNewMessageCount((prevCount) => {
          if (isMessageNew) {
            return prevCount - 1;
          }
          return prevCount;
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm("آیا از حذف این پیام اطمینان دارید؟")) {
      try {
        const res = await fetch(`/api/messages/${message._id}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          onDelete(message._id); // Remove message from UI
          isMessageNew && setNewMessageCount((prevCount) => prevCount - 1);
          toast.success("پیام با موفقیت حذف شد");
        } else {
          toast.error("مشکل در حذف پیام");
        }
      } catch (error) {
        console.log(error);
        toast.error("مشکل در حذف پیام");
      }
    }
  };

  return (
    <div className=" relative text-gray-700 mb-4 flex flex-col md:flex-row items-center md:items-end  gap-6 bmessage bmessage-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
      {isMessageNew && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          جدید
        </div>
      )}
      <div className="info w-full flex flex-col gap-3">
        <div className="message-time">
          <span className="font-semibold">زمان پیام :</span>{" "}
          {persianDateAndTime}
        </div>

        <div className="sender">
          <span className="font-semibold">فرستنده :</span> {userName}
        </div>

        <div className="subject">
          <span className="font-semibold">موضوع پیام :</span> {message.subject}
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-end gap-2">
        <Link
          href={`/admin/dashboard/messages/${message._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto px-4 py-1 md:py-2 rounded-lg text-center text-xs md:text-sm"
          onClick={handelOpenClick}
        >
          جزییات پیام
        </Link>
        <button
          className="bg-red-500 hover:bg-red-600 text-white w-full md:w-auto px-4 py-1 md:py-2 rounded-lg text-center text-xs md:text-sm"
          onClick={handleDeleteClick}
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default MessageCardAdmin;
