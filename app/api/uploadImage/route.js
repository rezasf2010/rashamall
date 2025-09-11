import cloudinary from '@/config/cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST/api/uploadImage
export const POST = async (request) => {
  try {
    const body = await request.json(); // Parse the incoming request body as JSON

    const files = body.files;
    // const files = request.body.files; // You might need to adjust how files are sent in the request
    const uploadPromises = [];

    for (const file of files) {
      const imageBuffer = Buffer.from(file, 'base64');

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBuffer.toString('base64')}`,
        {
          folder: 'rashamall',
        },
      );

      uploadPromises.push(result.secure_url);
    }

    const uploadedImages = await Promise.all(uploadPromises);

    return new Response(JSON.stringify(uploadedImages), { status: 200 });
  } catch {
    return new Response('Something went wrong', { status: 500 });
  }
};
