import connectDB from "@/config/database";
import Category from "@/models/Category";

// GET /api/categories
export const GET = async (request) => {
    await connectDB();

    const categories = await Category.find({});
    try {
        return new Response(JSON.stringify(categories), { status: 200} );
    } catch (error) {
        console.log(error);
       return new Response('Something went wrong', { status: 500 });
    }
};