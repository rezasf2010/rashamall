'use client';
import { useState, useEffect } from 'react';

const PostListCard = ({ post, onDelete }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const date = new Date(post.publishedDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = date.toLocaleDateString('fa-IR', options);
    setFormattedDate(formatted);
  }, [post.publishedDate]);

  return (
    <div className="text-gray-700 mb-4 flex flex-col md:flex-row items-center md:items-end gap-6 border border-gray-300 w-full p-4 rounded-2xl shadow-xl bg-gray-50">
      <div className="info w-full">
        <div className="mb-2">
          <span className="font-semibold">عنوان مقاله: </span>
          {post.mainTitle}
        </div>
        <div className="mb-2">
          <span className="font-semibold">تاریخ انتشار: </span>
          {formattedDate}
        </div>
        <div className="w-full flex gap-2 md:justify-end">
          <Link
            href={`/admin/dashboard/mag-edit/${post._id}`}
            className="w-1/2 flex md:justify-end md:w-auto"
          >
            <button className="w-full md:w-auto text-sm font-semibold px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
              ویرایش
            </button>
          </Link>
          <button
            onClick={() => onDelete(post._id)}
            className="w-1/2 md:w-auto text-sm font-semibold px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostListCard;
