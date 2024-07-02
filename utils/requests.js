const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

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

export { fetchCategories, fetchBrands, fetchProducts, fetchProduct };
