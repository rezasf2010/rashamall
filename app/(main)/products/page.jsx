import Products from "@/components/Products";
import Breadcrumb from "@/components/Breadcrumb";

const ProductsPage = () => {
  const pathSegments = [{ name: "خانه", link: "/" }, { name: "همه کالاها" }];

  return (
    <div className="w-full flex flex-col my-6 mr-12">
      <div className="flex flex-col items-start">
        <Breadcrumb pathSegments={pathSegments} />
        <div className="flex p-2 md:p-4 text-gray-700 text-lg md:text-2xl font-bold border-b-2 border-blue-500">
          همه کالاها
        </div>
      </div>
      <Products />
    </div>
  );
};

export default ProductsPage;
