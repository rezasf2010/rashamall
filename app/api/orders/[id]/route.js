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

// PUT /api/orders/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const order = await Order.findById(id);

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    // Update order isNewOrder status
    if (order.isNewOrder) {
      order.isNewOrder = false;
      await order.save();
    }

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/orders/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const order = await Order.findById(id);

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    await order.deleteOne();

    return new Response("Order deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
