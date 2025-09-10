import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_DOMAIN?.trim() || 'http://localhost:3000/api';

// Fetch all categories
const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE}/categories`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch all brands
const fetchBrands = async () => {
  try {
    const res = await fetch(`${API_BASE}/brands`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch all products
async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch single product
async function fetchProduct(mainCategoryId, subCategoryId, productId) {
  try {
    const res = await fetch(`${API_BASE}/products/${mainCategoryId}/${subCategoryId}/${productId}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fetch all users
const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_BASE}/users`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch all orders
const fetchOrders = async () => {
  try {
    const res = await fetch(`${API_BASE}/orders`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch all messages
const fetchMessages = async () => {
  try {
    const res = await fetch(`${API_BASE}/messages`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch single order
async function fetchOrder(orderId) {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fetch single message
async function fetchMessage(messageId) {
  try {
    const res = await fetch(`${API_BASE}/messages/${messageId}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fetch single category
async function fetchCategory(CategoryId) {
  try {
    const res = await fetch(`${API_BASE}/categories/${CategoryId}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fetch all posts
const fetchPosts = async () => {
  try {
    const res = await fetch(`${API_BASE}/posts`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteImageFromCloudinary = async (imageUrl) => {
  const publicId = extractPublicId(imageUrl);

  const response = await axios.delete(`/api/cloudinary/${publicId}`);

  return response.data;
};

const addImagesToCloudinary = async (files) => {
  const fileBase64Strings = await Promise.all(
    Array.from(files).map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(new Uint8Array(arrayBuffer)).toString('base64');
    }),
  );

  const response = await axios.post('/api/uploadImage', {
    files: fileBase64Strings,
  });

  return response.data;
};

const extractPublicId = (imageUrl) => {
  const parts = imageUrl.split('/');
  const publicIdWithExtension = parts[parts.length - 1];
  const publicId = publicIdWithExtension.split('.')[0];
  return publicId;
};

export {
  fetchCategories,
  fetchBrands,
  fetchProducts,
  fetchProduct,
  fetchUsers,
  fetchOrders,
  fetchOrder,
  fetchCategory,
  fetchPosts,
  fetchMessages,
  fetchMessage,
  deleteImageFromCloudinary,
  addImagesToCloudinary,
  extractPublicId,
};
