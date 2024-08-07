import connectDB from "@/config/database";
import Category from "@/models/Category";

// GET /api/categories
export const GET = async (request) => {
  await connectDB();

  const categories = await Category.find({});
  try {
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST /api/categories
export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

    // Function to format date as "YYYY-MM-DD"
    function formatDate(date) {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

    //Converting category name to slug
    function convertToSlug(name) {
      return name.toLowerCase().replace(/\s+/g, "-");
    }

    //check if its mainCategory or subCategory
    const categoryType = formData.get("categoryType");

    //Get fa_name of category
    const faName =
      categoryType === "mainCategory"
        ? formData.get("mainCategoryName")
        : formData.get("subCategoryName");

    //Get name of category
    const enName =
      categoryType === "mainCategory"
        ? formData.get("mainCategoryNameEn")
        : formData.get("subCategoryNameEn");

    // If its subCategory get parentCategory Id else return parent null
    const parent =
      categoryType === "subCategory" ? formData.get("mainCategoryName") : null;

    const categoryData = {
      name: enName,
      slug: convertToSlug(enName),
      fa_name: faName,
      fa_slug: convertToSlug(faName),
      parent,
      date_added: formatDate(new Date()), // Add the current date in "YYYY-MM-DD" format
    };

    const newCategory = new Category(categoryData);
    await newCategory.save();

    return Response.redirect(
      `${process.env.NEXT_PUBLIC_DOMAIN}/admin/dashboard/category-add`,
    );

    // return new Response(JSON.stringify({ message: "Success" }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error("Error adding category:", error);
    return new Response("Failded to add category", { status: 500 });
  }
};
