'use client';

import { useState, useEffect } from 'react';
import MagCard from '@/components/MagCard';
import Spinner from '@/components/Spinner';
import { fetchPosts } from '@/utils/requests';
import Breadcrumb from '@/components/Breadcrumb';

const MagazinePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  const pathSegments = [{ name: 'خانه', link: '/' }, { name: 'مجله راشامال' }];

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="w-full flex flex-col my-6 px-6">
      <div className="flex flex-col items-start">
        <Breadcrumb pathSegments={pathSegments} />
        <div className="flex p-2 md:p-4 text-gray-700 text-lg md:text-2xl font-bold border-b-2 border-blue-500 mb-6">
          مجله راشامال
        </div>
      </div>
      <div className="lg:w-full grid grid-cols-1 mx-auto md:grid-cols-2 gap-4 xl:grid-cols-3 place-items-center">
        {posts.map((post) => (
          <MagCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MagazinePage;
