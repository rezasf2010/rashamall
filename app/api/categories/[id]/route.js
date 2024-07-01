import connectDB from "@/config/database";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

// GET /api/categories/:id
export const GET = async (request) => {
  try {
    await connectDB();

    // Extract the id from the URL
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").pop();

    const category = await Category.findById(id);

    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
