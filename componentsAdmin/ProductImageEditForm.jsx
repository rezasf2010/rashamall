'use client';
import { useState, useEffect } from 'react';

const ProductImageEditForm = ({ product, onImageDelete, onImageAdd }) => {
  const [images, setImages] = useState(product.images || []);

  // Synchronize the images state with the product.images prop whenever it changes
  useEffect(() => {
    setImages(product.images || []);
  }, [product.images]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Call the onImageAdd function passed from the parent component
      await onImageAdd(files);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl md:text-3xl text-center font-semibold mb-6">ویرایش عکس ها</h2>
      <div className="flex flex-col gap-4 sm:flex-row">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative border border-gray-300 rounded-lg p-2 md:p-4 flex justify-center"
          >
            <button
              className="absolute top-0 right-0 text-red-500 text-lg font-bold bg-white rounded-full w-6 h-6 flex items-center justify-center"
              onClick={() => onImageDelete(image, index)}
            >
              ×
            </button>
            <Image
              className=""
              src={image}
              width={200}
              height={0}
              sizes="100vw"
              alt=""
              priority={true}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4 items-center mt-4">
        <Link href="/admin/dashboard/products-list" passHref>
          <button className="px-2 py-1 sm:px-4 sm:py-2 text-sm bg-gray-400 text-white rounded-lg hover:bg-gray-500">
            بازگشت
          </button>
        </Link>
        <div className="">
          <label className="px-2 py-1 sm:px-4 sm:py-2 text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            افزودن عکس
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductImageEditForm;
