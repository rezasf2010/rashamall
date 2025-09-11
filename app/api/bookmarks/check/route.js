import connectDB from '@/config/database';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  try {
    await connectDB();

    const { productId } = await request.json();

    const token = await getToken({ req: request });
    const userId = token?.sub;
    if (!userId) return new Response('User ID is required', { status: 401 });

    //find user in database
    const user = await User.findById(userId).lean();

    // Check if product is bookmarked
    const isBookmarked = user.savedProducts.some((id) => id.toString() === String(productId));

    return new Response(JSON.stringify({ isBookmarked }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
