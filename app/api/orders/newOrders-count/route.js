import connectDB from '@/config/database';
import Order from '@/models/Order';

export const dynamic = 'force-dynamic';

// GET /api/orders/newOrders-count
export const GET = async () => {
  try {
    await connectDB();

    const newOrdersCount = await Order.countDocuments({ isNewOrder: true });

    return new Response(JSON.stringify(newOrdersCount), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
