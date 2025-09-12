import connectDB from '@/config/database';
import Post from '@/models/Post';

// GET /api/posts/:id
export const GET = async ({ params }) => {
  try {
    await connectDB();

    const { id } = await params;
    const post = await Post.findById(id);

    if (!post) return new Response('Post Not Found', { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// DELETE /api/posts/:id
export const DELETE = async (request, { params }) => {
  try {
    const { id: postId } = await params;

    await connectDB();

    const post = await Post.findById(postId);

    if (!post) return new Response('Post Not Found', { status: 404 });

    await post.deleteOne();

    return new Response('Post deleted', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// PUT /api/posts/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const formData = await request.formData();

    // Access all values from sections
    const sectionTitles = formData.getAll('title');
    const sectionParagraphs = formData.getAll('paragraph');

    // Combine titles and paragraphs into an array of objects
    const sections = sectionTitles.map((title, index) => ({
      title,
      paragraph: sectionParagraphs[index],
    }));

    const updatedPostData = {
      mainTitle: formData.get('mainTitle'),
      intro: formData.get('intro'),
      outro: formData.get('outro'),
      sections,
    };

    const tags = formData.getAll('tags');
    if (tags.length > 0) {
      updatedPostData.tags = tags.map((tag) => tag);
    }

    const post = await Post.findById(id);
    if (!post) {
      return new Response('Post Not Found', { status: 404 });
    }

    // Update post in database
    const updatedPost = await Post.findByIdAndUpdate(id, updatedPostData);

    return new Response(JSON.stringify(updatedPost), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return new Response('Failed to update post', { status: 500 });
  }
};
