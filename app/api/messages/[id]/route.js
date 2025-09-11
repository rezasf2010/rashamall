import connectDB from '@/config/database';
import Message from '@/models/Message';

// GET /api/messages/:id
export const GET = async ({ params }) => {
  try {
    await connectDB();

    const message = await Message.findById(params.id);

    if (!message) return new Response('Message Not Found', { status: 404 });

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.error('Error fetching message:', error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// PUT /api/messages/:id
export const PUT = async ({ params }) => {
  try {
    await connectDB();

    const { id } = params;

    const message = await Message.findById(id);

    if (!message) {
      return new Response('Message not found', { status: 404 });
    }

    // Update message read status
    if (!message.read) {
      message.read = true;
      await message.save();
    }

    return new Response(JSON.stringify({ isNewMessage: !message.read }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// DELETE /api/messages/:id
export const DELETE = async ({ params }) => {
  try {
    await connectDB();

    const { id } = params;

    const message = await Message.findById(id);

    if (!message) {
      return new Response('Message not found', { status: 404 });
    }

    await message.deleteOne();

    return new Response('Message deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting message:', error);
    return new Response('Something went wrong', { status: 500 });
  }
};
