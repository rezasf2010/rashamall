import connectDB from '@/config/database';
import Product from '@/models/Product';
import cloudinary from '@/config/cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/products
export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get('page') || 1;
    const pageSize = request.nextUrl.searchParams.get('pageSize') || 9;

    const skip = (page - 1) * pageSize;

    const total = await Product.countDocuments({});
    const products = await Product.find({}).skip(skip).limit(pageSize);
    const totalProducts = await Product.find({});

    const result = {
      total,
      products,
      totalProducts,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// POST /api/products
export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

    //Converting product name to slug
    function convertToSlug(name) {
      return name.toLowerCase().replace(/\s+/g, '-');
    }

    // Access all values from specifications
    const specificationsKeys = formData.getAll('key');
    const specificationsValues = formData.getAll('value');

    // Combine keys and values into an array of objects
    const specifications = specificationsKeys.map((key, index) => ({
      key,
      value: specificationsValues[index],
    }));

    //Access all values from features
    const features = formData.getAll('features');

    //Access all values from services
    const services = formData.getAll('services');

    //Access all values from comments
    const comments = formData.getAll('comments');

    //Access all values from images
    const images = formData.getAll('images').filter((image) => image.name !== '');

    // Create productData object for database
    const productData = {
      name: formData.get('name'),
      slug: convertToSlug(formData.get('name')),
      brand: formData.get('brand'),
      main_category: formData.get('mainCategory'),
      sub_category: formData.get('subCategory'),
      price: formData.get('price'),
      description: formData.get('description'),
      specifications,
      features,
      services,
      comments,
      is_onSale: formData.get('is_onSale') === 'on', // Convert to boolean
      discount: formData.get('discount') ? parseInt(formData.get('discount'), 10) : 0,
      _stock_status: formData.get('_stock_status'),
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
        folder: 'rashamall',
      });

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      // Add uploaded images to the productData object
      productData.images = uploadedImages;
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    return Response.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/admin/dashboard/add`);

    // return new Response(JSON.stringify({ message: "Success" }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error('Error adding product:', error);
    return new Response('Failded to add product', { status: 500 });
  }
};
