import cloudinary from "@/config/cloudinary";

export const DELETE = async (request, { params }) => {
  const publicId = params.id;

  try {
    await cloudinary.uploader.destroy(publicId);
    return new Response("Image deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return new Response("Failed to delete image", { status: 500 });
  }
};
