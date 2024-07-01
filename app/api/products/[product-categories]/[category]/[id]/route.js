import connectDB from "@/config/database";
import Product from "@/models/Product";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  console.log(params.id);
  try {
    await connectDB();

    const product = await Product.findById(params.id);

    if (!product) return new Response("Product Not Found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
