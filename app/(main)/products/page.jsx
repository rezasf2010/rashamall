import Products from "@/components/Products";

const ProductsPage = () => {
  return (
    <div className=" flex flex-col items-center my-6 md:items-start md:mr-6">
      <div className="flex pr-2 text-gray-700 font-bold mb-4">همه محصولات</div>
      <Products />
    </div>
  );
};

export default ProductsPage;
