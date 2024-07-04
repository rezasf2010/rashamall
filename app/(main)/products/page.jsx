import Products from "@/components/Products";
import Breadcrumb from "@/components/Breadcrumb";

const ProductsPage = () => {
  const pathSegments = [{ name: "خانه", link: "/" }, { name: "همه کالاها" }];

  return (
    <div className="w-full flex flex-col items-center my-6 md:items-start md:mr-12">
      <Breadcrumb pathSegments={pathSegments} />
      <div className="flex p-4 text-gray-700 text-2xl font-bold border-b-2 border-blue-500">
        همه کالاها
      </div>
      <Products />
    </div>
  );
};

export default ProductsPage;
