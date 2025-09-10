import connectDB from '@/config/database';
import User from '@/models/User';

// GET /api/users
export const GET = async () => {
  try {
    await connectDB();

    const users = await User.find({});

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// POST /api/users
export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

    const userData = {
      name: formData.get('name'),
      username: formData.get('username') || formData.get('name').slice(0, 20),
      mobile: formData.get('mobile'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: {
        street: formData.get('address.street'),
        city: formData.get('address.city'),
        state: formData.get('address.state'),
        zip: formData.get('address.zip'),
      },
    };

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      // Update existing user
      await User.updateOne({ email: userData.email }, userData);
    } else {
      // Create new user
      const newUser = new User(userData);
      await newUser.save();
    }

    return Response.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/order_success`);

    // return new Response(JSON.stringify({ message: "Success" }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error('Error adding/updating user:', error);
    return new Response('Failed to add/update user', { status: 500 });
  }
};
