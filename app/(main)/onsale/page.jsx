import ProductsOnSale from "@/components/ProductsOnSale";
import Breadcrumb from "@/components/Breadcrumb";

const OnSalePage = () => {
  const pathSegments = [
    { name: "خانه", link: "/" },
    { name: "کالا های حراجی" },
  ];
  return (
    <div className="w-full flex flex-col items-center my-6 md:items-start md:mr-12">
      <Breadcrumb pathSegments={pathSegments} />
      <div className="flex p-4 text-gray-700 text-2xl font-bold border-b-2 border-blue-500">
        کالا های حراجی
      </div>
      <ProductsOnSale />
    </div>
  );
};

export default OnSalePage;
