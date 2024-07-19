// /pages/api/users/[email].js
import connectDB from "@/config/database";
import User from "@/models/User";

export async function GET(req, { params }) {
  const { email } = params;

  await connectDB();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    await connectDB();

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
        {
          folder: "user",
        },
      );

      imageUploadPromises.push(result.secure_url);
    }

    const uploadedImages = await Promise.all(imageUploadPromises);

    userData.receipt_image = uploadedImages;

    const newUser = new User(userData);
    await newUser.save();

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response("Failed to add user", { status: 500 });
  }
}
