"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  fetchProduct,
  deleteImageFromCloudinary,
  addImagesToCloudinary,
  extractPublicId,
} from "@/utils/requests";
import Spinner from "@/components/Spinner";
import ProductImageEditForm from "@/componentsAdmin/ProductImageEditForm";
import { toast } from "react-toastify";
import axios from "axios";

const ProductImageEditPage = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const productId = params.id;

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;
      try {
        const product = await fetchProduct("mainCat", "subCat", productId);

        setProduct(product);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleImageDelete = async (imageUrl, index) => {
    try {
      // Remove the image from the product's image array
      const updatedImages = product.images.filter((_, i) => i !== index);

      // Delete the image from Cloudinary
      await deleteImageFromCloudinary(imageUrl);

      // Create a new FormData object
      const formData = new FormData();
      formData.append("images", JSON.stringify(updatedImages));

      // Update the product in the database with formData
      await axios.put(`/api/products/1/1/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for FormData
        },
      });

      // Update the local state to remove the image from the UI
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: updatedImages,
      }));

      toast.success("عکس با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageAdd = async (files) => {
    try {
      // Upload the images to Cloudinary
      const uploadedImageUrls = await addImagesToCloudinary(files);

      // Add the new image URLs to the existing images array
      const updatedImages = [...product.images, ...uploadedImageUrls];

      // Create a new FormData object
      const formData = new FormData();
      formData.append("images", JSON.stringify(updatedImages));

      // Update the product in the database with the new images array
      await axios.put(`/api/products/1/1/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for FormData
        },
      });

      // Update the local state to add the new image to the UI
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: updatedImages,
      }));

      toast.success("عکس با موفقیت اضافه شد");
    } catch (error) {
      console.error("Error adding image:", error);
      toast.error("خطا در افزودن عکس");
    }
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="w-full">
      <div className="lg:w-11/12 lg:m-auto flex justify-center">
        <div className="bg-white w-full flex justify-center px-6 py-8 mb-4 shadow-md rounded-md border">
          <ProductImageEditForm
            product={product}
            onImageDelete={handleImageDelete}
            onImageAdd={handleImageAdd}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageEditPage;
