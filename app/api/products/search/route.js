import connectDB from "@/config/database";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

//GET /api/products/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get("query");

    const queryPattern = new RegExp(searchQuery, "i");

    // match querypatterns against database
    let query = {
      $or: [
        { name: queryPattern },
        { slug: queryPattern },
        { description: queryPattern },
        { features: queryPattern },
        { "specifications.key": queryPattern },
        { "specifications.value": queryPattern },
      ],
    };

    const products = await Product.find(query);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
