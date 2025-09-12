import connectDB from '@/config/database';
import Product from '@/models/Product';

// GET /api/products/:product_categories
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const { product_categories: productCategoryId } = await params;

    const page = request.nextUrl.searchParams.get('page') || 1;
    const pageSize = request.nextUrl.searchParams.get('pageSize') || 9;

    const skip = (page - 1) * pageSize;

    const total = await Product.countDocuments({
      $or: [{ main_category: productCategoryId }, { sub_category: productCategoryId }],
    });

    const products = await Product.find({
      $or: [{ main_category: productCategoryId }, { sub_category: productCategoryId }],
    })
      .skip(skip)
      .limit(pageSize);

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
