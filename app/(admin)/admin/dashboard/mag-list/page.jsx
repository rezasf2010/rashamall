"use client";
import { useState, useEffect } from "react";
import { fetchPosts } from "@/utils/requests";
import PostListCard from "@/componentsAdmin/PostListCard";
import { PostListCardSkeleton } from "@/ui/skeletons";
import { toast } from "react-toastify";

const MagListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm("آیا از حذف این مقاله اطمینان دارید؟");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId),
        );
        toast.success("مقاله با موفقیت حذف شد");
      } else {
        toast.error("مشکل در حذف مقاله");
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکل در حذف مقاله");
    }
  };

  return (
    <div className=" w-full">
      <div className="lg:w-11/12 lg:m-auto flex justify-center">
        <div className="bg-white w-full min-h-3/4 flex flex-col items-center px-2 sm:px-4 py-4 md:px-6 mb-4 shadow-md rounded-md border">
          <h2 className="text-lg md:text-3xl text-center font-semibold mb-6">
            لیست مقاله ها
          </h2>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <PostListCardSkeleton key={index} />
              ))
            : posts.map((post) => (
                <PostListCard
                  key={post._id}
                  post={post}
                  onDelete={handleDeletePost}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default MagListPage;
