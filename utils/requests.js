const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
import axios from "axios";

// Fetch all categories
const fetchCategories = async () => {
  //Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  try {
    const res = await fetch(`${apiDomain}/categories`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch all brands
const fetchBrands = async () => {
  //Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  try {
    const res = await fetch(`${apiDomain}/brands`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
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
    //Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/products`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
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
    //Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(
      `${apiDomain}/products/${mainCategoryId}/${subCategoryId}/${productId}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fetch all users
const fetchUsers = async () => {
  //Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  try {
    const res = await fetch(`${apiDomain}/users`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch all orders
const fetchOrders = async () => {
  //Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  try {
    const res = await fetch(`${apiDomain}/orders`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch all messages
const fetchMessages = async () => {
  //Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  try {
    const res = await fetch(`${apiDomain}/messages`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
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
    //Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/orders/${orderId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
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
    //Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/messages/${messageId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
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
    //Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/categories/${CategoryId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fetch all posts
const fetchPosts = async () => {
  //Handle the case where the domain is not available yet
  if (!apiDomain) {
    return [];
  }

  try {
    const res = await fetch(`${apiDomain}/posts`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
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

// const addImagesToCloudinary = async (files) => {
//   const uploadPromises = Array.from(files)
//   .map((file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "rashamall_upload_preset"); // Replace with your actual preset

//     return axios.post(`https://api.cloudinary.com/rezasf/v1_1/rashamall/image/upload`, formData)
//       .then((response) => response.data.secure_url);
//   });

//   return Promise.all(uploadPromises);
// };

const addImagesToCloudinary = async (files) => {
  const fileBase64Strings = await Promise.all(
    Array.from(files).map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(new Uint8Array(arrayBuffer)).toString("base64");
    }),
  );

  const response = await axios.post("/api/uploadImage", {
    files: fileBase64Strings,
  });

  return response.data;
};

const extractPublicId = (imageUrl) => {
  const parts = imageUrl.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  const publicId = publicIdWithExtension.split(".")[0];
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
