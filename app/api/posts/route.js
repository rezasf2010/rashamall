import connectDB from '@/config/database';
import Post from '@/models/Post';
import cloudinary from '@/config/cloudinary';
import { Buffer } from 'buffer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/posts
export const GET = async () => {
  try {
    await connectDB();

    const posts = await Post.find({});

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// POST /api/posts
export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

    //Converting post mainTitle to slug
    function convertToSlug(mainTitle) {
      return mainTitle.toLowerCase().replace(/\s+/g, '-');
    }

    // Access all values from sections
    const sectionTitles = formData.getAll('title');
    const sectionParagraghs = formData.getAll('paragraph');

    // Combine titles and paragraphs into an array of objects
    const sections = sectionTitles.map((title, index) => ({
      title,
      paragraph: sectionParagraghs[index],
    }));

    //Access all values from tags
    const tags = formData.getAll('tags');

    //Access all values from images
    const images = formData.getAll('images').filter((image) => image.name !== '');

    // Create postData object for database
    const postData = {
      mainTitle: formData.get('mainTitle'),
      slug: convertToSlug(formData.get('mainTitle')),
      intro: formData.get('intro'),
      sections,
      outro: formData.get('outro'),
      tags,
    };

    // Upload image(s) to Cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString('base64');

      // Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
        folder: 'rashamall-mag',
      });

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      // Add uploaded images to the postData object
      postData.images = uploadedImages;
    }

    const newPost = new Post(postData);
    await newPost.save();

    return Response.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/admin/dashboard/mag-add`);

    // return new Response(JSON.stringify({ message: "Success" }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error('Error adding post:', error);
    return new Response('Failded to add post', { status: 500 });
  }
};
