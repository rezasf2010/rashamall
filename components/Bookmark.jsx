"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import SpinnerH from "./SpinnerH";

const Bookmark = ({ product }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [product._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("ابتدا وارد حساب کاربری شوید");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <SpinnerH loading={loading} />;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white rounded-lg text-sm"
    >
      حذف از لیست ذخیره
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-lg text-sm"
    >
      ذخیره کالا
    </button>
  );
};

export default Bookmark;
