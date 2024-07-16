import connectDB from "@/config/database";
import Order from "@/models/Order";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// GET api/orders
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("user ID is required", { status: 401 });
    }

    const orders = await Order.find({ user: sessionUser.userId }).populate(
      "items.product",
    );

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

    const { userId } = sessionUser;

    const {
      items,
      totalQuantity,
      totalAmount,
      details,
      paymentMethod,
      receiptImage,
    } = await request.json();

    const newOrder = new Order({
      user: userId,
      items,
      totalQuantity,
      totalAmount,
      details,
      paymentMethod,
      receiptImage,
    });

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
