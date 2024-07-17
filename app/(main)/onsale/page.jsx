import ProductsOnSale from "@/components/ProductsOnSale";
import Breadcrumb from "@/components/Breadcrumb";

const OnSalePage = () => {
  const pathSegments = [
    { name: "خانه", link: "/" },
    { name: "کالا های حراجی" },
  ];
  return (
    <div className="w-full flex flex-col my-6 pr-6">
      <div className="flex flex-col items-start">
        <Breadcrumb pathSegments={pathSegments} />
        <div className="flex p-2 md:p-4 text-gray-700 text-lg md:text-2xl font-bold border-b-2 border-blue-500 mb-6">
          کالا های حراجی
        </div>
      </div>
      <ProductsOnSale />
    </div>
  );
};

export default OnSalePage;
