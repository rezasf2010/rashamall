import connectDB from "@/config/database";
import Message from "@/models/message";

export const dynamic = "force-dynamic";

// GET /api/messages/newMessages-count
export const GET = async (request) => {
  try {
    await connectDB();

    const newMessageCount = await Message.countDocuments({ read: false });

    return new Response(JSON.stringify(newMessageCount), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
