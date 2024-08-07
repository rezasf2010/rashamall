import connectDB from "@/config/database";
import User from "@/models/User";

//GET /pages/api/users/[email].js
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

//POST /pages/api/users/[email].js
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

// PUT /api/users/[email].js
export async function PUT(request, { params }) {
  const { email } = params;

  await connectDB();

  try {
    const formData = await request.formData();

    // Create the updated user data object
    const updatedUserData = {
      name: formData.get("name"),
      username: formData.get("username"),
      mobile: formData.get("mobile"),
      phone: formData.get("phone"),
      address: {
        street: formData.get("address.street"),
        city: formData.get("address.city"),
        state: formData.get("address.state"),
        zip: formData.get("address.zip"),
      },
    };

    // Update user in database
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updatedUserData,
      { new: true, runValidators: true }, // Options to return the updated document and validate it
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Failed to update user", { status: 500 });
  }
}

// DELETE /api/posts/:email
export const DELETE = async (request, { params }) => {
  try {
    const userId = params.email;

    await connectDB();

    const user = await User.findById(userId);

    if (!user) return new Response("User Not Found", { status: 404 });

    await User.deleteOne();

    return new Response("User deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
