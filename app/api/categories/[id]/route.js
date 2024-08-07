import connectDB from "@/config/database";
import Category from "@/models/Category";

// GET /api/categories/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const category = await Category.findById(params.id);

    if (!category) return new Response("Category Not Found", { status: 404 });

    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/categories/:id
export const DELETE = async (request, { params }) => {
  try {
    const categoryId = params.id;

    await connectDB();

    const category = await Category.findById(categoryId);

    if (!category) return new Response("Category Not Found", { status: 404 });

    await category.deleteOne();

    return new Response("Category deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// PUT /api/categories/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    // Helper function to convert names to slugs
    function convertToSlug(name) {
      return name.toLowerCase().replace(/\s+/g, "-");
    }

    const { id } = params;
    const formData = await request.formData();

    // Extracting form data
    const categoryType = formData.get("type");
    const mainCategoryName = formData.get("mainCategoryName");
    const subCategoryName = formData.get("subCategoryName");
    const subCategoryNameEn = formData.get("subCategoryNameEn");

    // Prepare category data
    let categoryData = {
      fa_name: subCategoryName,
      name: subCategoryNameEn,
      fa_slug: convertToSlug(subCategoryName),
      slug: convertToSlug(subCategoryNameEn),
      date_added: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    };

    if (categoryType === "sub") {
      categoryData.parent = mainCategoryName;
    } else {
      categoryData.parent = null;
    }

    // Find the category by ID and update it
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
    });

    if (!updatedCategory) {
      return new Response("Category Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
