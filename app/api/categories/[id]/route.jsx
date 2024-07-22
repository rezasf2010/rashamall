import connectDB from "@/config/database";
import Category from "@/models/Category";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/categories/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const category = await Category.findById(params.id);

    if (!category) return new Response("Category Not Found", { status: 404 });

    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/categories/:id
export const DELETE = async (request, { params }) => {
  try {
    const categoryId = params.id;

    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("user ID is required", { status: 401 });
    }

    const category = await Category.findById(categoryId);

    if (!category) return new Response("Category Not Found", { status: 404 });

    await category.deleteOne();

    return new Response("Category deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
