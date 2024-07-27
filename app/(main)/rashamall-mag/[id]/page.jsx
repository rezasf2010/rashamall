"use client";

import { useState, useEffect } from "react";
import { fetchPosts } from "@/utils/requests";
import Spinner from "@/components/Spinner";
import { useParams, useRouter } from "next/navigation";

const PostPage = () => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  const postId = params.id;

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  const post = posts.find((post) => post._id === postId);

  return (
    <div className=" mx-12 py-8 px-4 md:px-8">
      {/* Main Title */}
      <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-6">
        {post.mainTitle}
      </h1>

      {/* Intro */}
      <p className="text-gray-700 text leading-relaxed mb-8">{post.intro}</p>

      {/* Image */}
      {post.images && post.images.length > 0 && (
        <img
          src={post.images[0]}
          alt={post.mainTitle}
          className="w-full h-auto rounded-lg mb-8"
        />
      )}

      {/* Sections */}
      {post.sections.map((section) => (
        <div key={section._id} className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            {section.title}
          </h2>
          <p className="text-gray-700 leading-relaxed">{section.paragraph}</p>
        </div>
      ))}

      {/* Outro */}
      <div className="mt-8">
        <p className="text-gray-700 leading-relaxed">{post.outro}</p>
      </div>

      {/* Tags */}
      <div className="mt-8">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 text-gray-800 text-sm md:text-base font-semibold mr-2 mb-2 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-center space-x-4 gap-6">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => router.push("/rashamall-mag")}
        >
          بازگشت
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => router.push("/")}
        >
          صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default PostPage;
