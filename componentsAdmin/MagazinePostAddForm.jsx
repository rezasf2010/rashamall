"use client";
import { useState, useEffect } from "react";
import MagazinePostSection from "./MagazinePostSection";
import MagazinePostTags from "./MagazinePostTags";
import { useRouter } from "next/navigation";

const MagazinePostAddForm = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const initialFields = {
    mainTitle: "",
    slug: "",
    intro: "",
    sections: [],
    tags: [],
    outro: "",
    images: [],
  };

  const [fields, setFields] = useState(initialFields);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
        encType: "multipart/form-data",
      });

      if (res.status === 200) {
        toast.success("مقاله با موفقیت افزوده شد");
        setFields(initialFields); // Reset form fields to initial state
        router.push(`/admin/dashboard/mag-add`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error("Permission denied");
      } else {
        toast.error("مشکل در افزودن مقاله");
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکل در افزودن مقاله");
    }
  };

  return (
    mounted && (
      <form onSubmit={handleSubmit}>
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
