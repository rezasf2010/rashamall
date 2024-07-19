import connectDB from "@/config/database";
import Order from "@/models/Order";

// GET /api/orders/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const order = await Order.findById(params.id);

    if (!order) return new Response("Order Not Found", { status: 404 });

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
