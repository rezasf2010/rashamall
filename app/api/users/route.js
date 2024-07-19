import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/users
export const GET = async (request) => {
  try {
    await connectDB();

    const users = await User.find({});

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST /api/users
export const POST = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser(request);
    if (!sessionUser || !sessionUser.userId) {
      return new Response("user ID is required", { status: 401 });
    }

    const formData = await request.formData();
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    const userData = {
      name: formData.get("name"),
      username: formData.get("username"),
      mobile: formData.get("mobile"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: {
        street: formData.get("address.street"),
        city: formData.get("address.city"),
        state: formData.get("address.state"),
        zip: formData.get("address.zip"),
      },
    };

    const imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "user" },
      );
      imageUploadPromises.push(result.secure_url);
    }
    const uploadedImages = await Promise.all(imageUploadPromises);
    userData.receipt_image = uploadedImages;

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      // Update existing user
      await User.updateOne({ email: userData.email }, userData);
    } else {
      // Create new user
      const newUser = new User(userData);
      await newUser.save();
    }

    return Response.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/order_success`);

    // return new Response(JSON.stringify({ message: "Success" }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error("Error adding/updating user:", error);
    return new Response("Failed to add/update user", { status: 500 });
  }
};
