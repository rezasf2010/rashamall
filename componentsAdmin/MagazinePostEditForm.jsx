'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

const MagazinePostEditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    mainTitle: '',
    slug: '',
    intro: '',
    sections: [],
    tags: [],
    outro: '',
  });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const post = await res.json();
        setFields(post);
        setMounted(true);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Not nested
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSectionsChange = (sections) => {
    setFields({ ...fields, sections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: formData,
        encType: 'multipart/form-data',
      });

      if (res.status === 200) {
        toast.success('مقاله با موفقیت به روز رسانی شد');
        router.push(`/admin/dashboard/mag-list`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error('Permission denied');
      } else {
        toast.error('مشکل در بروزرسانی مقاله');
      }
    } catch (error) {
      console.log(error);
      toast.error('مشکل در بروزرسانی مقاله');
    }
  };

  return (
    mounted && (
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl md:text-3xl text-center font-semibold mb-6">ویرایش پست</h2>

        <div className="mb-4">
          <label htmlFor="mainTitle" className="flex  pr-2 text-gray-700 font-bold mb-2">
            عنوان پست
          </label>
          <input
            type="text"
            id="mainTitle"
            name="mainTitle"
            className="border border-gray-300 rounded w-full py-2 px-3 mb-2"
            placeholder="مثال: مقایسه بهترین برند‌های سازنده کولرگازی و اسپیلت "
            required
            value={fields.mainTitle}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="intro" className="flex  pr-2 text-gray-700 font-bold mb-2">
            متن شروع
          </label>
          <textarea
            id="intro"
            name="intro"
            className="border border-gray-300 rounded w-full py-2 px-3 resize-none"
            rows="4"
            placeholder="توضیحات کلی، اصلی و اولیه راجع به پست"
            value={fields.intro}
            onChange={handleChange}
          ></textarea>
        </div>

        <MagazinePostSection sections={fields.sections} setSections={handleSectionsChange} />

        <div className="mb-4 ">
          <label htmlFor="outro" className="flex  pr-2 text-gray-700 font-bold mb-2">
            متن پایانی
          </label>
          <textarea
            id="outro"
            name="outro"
            className="border border-gray-300 rounded w-full py-2 px-3 resize-none"
            rows="4"
            placeholder="توضیحات کلی، اصلی و اولیه راجع به پست"
            value={fields.outro}
            onChange={handleChange}
          ></textarea>
        </div>

        <MagazinePostTags tags={fields.tags} setTags={(tags) => setFields({ ...fields, tags })} />

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            به روز رسانی پست
          </button>
        </div>
      </form>
    )
  );
};

export default MagazinePostEditForm;
