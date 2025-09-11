import connectDB from '@/config/database';
import Product from '@/models/Product';

// GET /api/products/:id
export const GET = async ({ params }) => {
  try {
    await connectDB();

    const product = await Product.findById(params.id);

    if (!product) return new Response('Product Not Found', { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// DELETE /api/products/:id
export const DELETE = async ({ params }) => {
  try {
    const productId = params.id;

    await connectDB();

    const product = await Product.findById(productId);

    if (!product) return new Response('Product Not Found', { status: 404 });

    await product.deleteOne();

    return new Response('Product deleted', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// PUT /api/products/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const formData = await request.formData();

    // Parse the JSON string back into an array if images are provided
    let updatedImages;
    if (formData.get('images')) {
      updatedImages = JSON.parse(formData.get('images'));
    }

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

    // Get product to update
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return new Response('Product does not exist', { status: 404 });
    }

    // // Create productData object for database
    // const productData = {
    //   name: formData.get("name"),
    //   slug: convertToSlug(formData.get("name")),
    //   brand: formData.get("brand"),
    //   main_category: formData.get("mainCategory"),
    //   sub_category: formData.get("subCategory"),
    //   price: formData.get("price"),
    //   description: formData.get("description"),
    //   specifications,
    //   features,
    //   services,
    //   comments,
    //   is_onSale: formData.get("is_onSale") === "on", // Convert to boolean
    //   discount: formData.get("discount")
    //     ? parseInt(formData.get("discount"), 10)
    //     : 0,
    //   _stock_status: formData.get("_stock_status"),
    // };

    // Create a productData object for database update
    const productData = {
      ...(formData.get('name') && {
        name: formData.get('name'),
        slug: convertToSlug(formData.get('name')),
      }),
      ...(formData.get('brand') && { brand: formData.get('brand') }),
      ...(formData.get('mainCategory') && {
        main_category: formData.get('mainCategory'),
      }),
      ...(formData.get('subCategory') && {
        sub_category: formData.get('subCategory'),
      }),
      ...(formData.get('price') && { price: formData.get('price') }),
      ...(formData.get('description') && {
        description: formData.get('description'),
      }),
      ...(updatedImages && { images: updatedImages }), // Add or update the images
      ...(specifications.length && { specifications }),
      ...(features.length && { features }),
      ...(services.length && { services }),
      ...(comments.length && { comments }),
      ...(formData.get('is_onSale') !== null && {
        is_onSale: formData.get('is_onSale') === 'on',
      }),
      ...(formData.get('discount') && {
        discount: parseInt(formData.get('discount'), 10) || 0,
      }),
      ...(formData.get('_stock_status') && {
        _stock_status: formData.get('_stock_status'),
      }),
    };

    // Update product in database
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return new Response('Failded to add product', { status: 500 });
  }
};
