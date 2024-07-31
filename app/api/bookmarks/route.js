import connectDB from "@/config/database";
import User from "@/models/User";
import Product from "@/models/Product";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/bookmarks
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    //find user in database
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Get users bookmarks
    const bookmarks = await Product.find({ _id: { $in: user.savedProducts } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST /api/bookmarks
export const POST = async (request) => {
  try {
    await connectDB();

    const { productId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    //find user in database
    const user = await User.findOne({ _id: userId });

    // Check if product is bookmarked
    let isBookmarked = user.savedProducts.includes(productId);

    let message;

    if (isBookmarked) {
      // if already bookmarked, remove it
      user.savedProducts.pull(productId);
      message = "کالا با موفقیت از لیست ذخیره حذف شد";
      isBookmarked = false;
    } else {
      // if not Bookmarked, add it
      user.savedProducts.push(productId);
      message = "کالا با موفقیت به لیست ذخیره اضافه شد";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
