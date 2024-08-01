import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/messages
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("user ID is required", { status: 401 });
    }

    const oldMessagess = await Message.find({ read: true }).sort({
      createdAt: -1,
    }); //sorts opened messagess in ascending messages

    const newMessagess = await Message.find({ read: false }).sort({
      createdAt: -1,
    }); //sorts new messagess in ascending messages

    const messagess = [...newMessagess, ...oldMessagess];

    return new Response(JSON.stringify(messagess), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ error: "User not logged in" }), {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    const { email, subject, body } = await request.json();

    // Create a new message
    const newMessage = new Message({
      sender: userId,
      email,
      subject,
      body,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
};
