import connectDB from "@/config/database";
import Order from "@/models/Order";
import User from "@/models/User";
import cloudinary from "@/config/cloudinary";
import { getSessionUser } from "@/utils/getSessionUser";

// GET api/orders
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("user ID is required", { status: 401 });
    }

    const orders = await Order.find({});

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST api/orders
export const POST = async (request) => {
  await connectDB();

  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("user ID is required", { status: 401 });
    }

    const formData = await request.formData(); // Initialize formData

    console.log(formData);

    const userId = sessionUser.userId;
    const items = JSON.parse(formData.get("items"));
    const totalQuantity = Number(formData.get("totalQuantity"));
    const totalAmount = Number(formData.get("totalAmount"));
    const details = formData.get("details");
    const paymentMethod = formData.get("paymentMethod");
    const receiptImageFile = formData.get("receiptImage");
    const isNew = formData.get("isNew");

    // Upload single receipt image to Cloudinary
    let receiptImageUrl = "";
    if (receiptImageFile && receiptImageFile.size > 0) {
      const imageBuffer = await receiptImageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "receiptImage",
        },
      );

      receiptImageUrl = result.secure_url;
    }

    const newOrder = new Order({
      user: userId,
      items,
      totalQuantity,
      totalAmount,
      details,
      paymentMethod,
      receiptImage: receiptImageUrl,
      isNew,
    });

    console.log(newOrder);

    const savedOrder = await newOrder.save();

    await User.findByIdAndUpdate(sessionUser.userId, {
      $push: { orders: savedOrder._id },
    });

    return new Response(JSON.stringify(savedOrder), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
