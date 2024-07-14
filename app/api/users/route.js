import connectDB from "@/config/database";
import User from "@/models/User";
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

    //   const sessionUser = await getSessionUser();

    // if (!sessionUser || !sessionUser.userId) {
    //   return new Response("user ID is required", { status: 401 });
    // }

    //   const { userId } = sessionUser;

    const formData = await request.formData();

    //Access all values from images
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // Create userData object for database
    const userData = {
      firstname: formData.get("firstName"),
      lastname: formData.get("lastName"),
      username: formData.get("username"),
      mobile: formData.get("mobile"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: {
        street: formData.get("address.street"),
        city: formData.get("address.city"),
        state: formData.get("address.state"),
        zipcode: formData.get("address.zip"),
      },
      details: formData.get("details"),
      paymentMethod: formData.get("paymentMethod"),
    };

    // Upload image(s) to Cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      // Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "user",
        },
      );

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      // Add uploaded images to the userData object
      userData.receipt_image = uploadedImages;
    }

    console.log(userData);

    const newUser = new User(userData);
    await newUser.save();

    //   return Response.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/admin/add`);

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response("Failded to add user", { status: 500 });
  }
};
