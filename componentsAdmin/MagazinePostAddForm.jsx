"use client";
import { useState, useEffect } from "react";
import MagazinePostSection from "./MagazinePostSection";
import MagazinePostTags from "./MagazinePostTags";

const MagazinePostAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    mainTitle: "",
    slug: "",
    intro: "",
    sections: [],
    tags: [],
    outro: "",
    images: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleImageChange = (e) => {
    const { files } = e.target;

    // Clone image array
    const updatedImages = [...fields.images];

    // Add new files to the array
    for (const file of files) {
      updatedImages.push(file);
    }

    //Upadte state with arraye of images
    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  return (
    mounted && (
      <form action="/api/posts" method="POST" encType="multipart/form-data">
        <h2 className="text-xl md:text-3xl text-center font-semibold mb-6">
          افزودن پست جدید
        </h2>

        <div className="mb-4">
          <label
            htmlFor="mainTitle"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
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
          <label
            htmlFor="intro"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
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

        <MagazinePostSection
          sections={fields.sections}
          setSections={handleSectionsChange}
        />

        <div className="mb-4 ">
          <label
            htmlFor="outro"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
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

        <MagazinePostTags
          tags={fields.tags}
          setTags={(tags) => setFields({ ...fields, tags })}
        />

        <div className="mb-4">
          <label
            htmlFor="images"
            className="flex  pr-2 text-gray-700 font-bold mb-2"
          >
            عکس مربوط به پست (حداکثر 2 عکس)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="border border-gray-300 rounded w-full py-2 px-4 drop-down"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            افزودن پست
          </button>
        </div>
      </form>
    )
  );
};

export default MagazinePostAddForm;
