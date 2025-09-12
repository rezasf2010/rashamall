import connectDB from '@/config/database';
import Product from '@/models/Product';

// GET /api/brands/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const { id: brandId } = await params;

    const page = request.nextUrl.searchParams.get('page') || 1;
    const pageSize = request.nextUrl.searchParams.get('pageSize') || 9;

    const skip = (page - 1) * pageSize;

    const total = await Product.countDocuments({ brand: brandId });

    const products = await Product.find({ brand: brandId }).skip(skip).limit(pageSize);

    const result = {
      total,
      products,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
