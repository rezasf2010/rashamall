import connectDB from '@/config/database';
import Brand from '@/models/Brand';

// GET /api/brands
export const GET = async () => {
  try {
    await connectDB();

    const brands = await Brand.find({});

    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
