import ProductsOnSale from "@/components/ProductsOnSale";

const OnSalePage = () => {
  return (
    <div className=" flex flex-col items-center my-6 md:items-start md:mr-6">
      <div className="flex p-4 text-gray-700 text-2xl font-bold border-b-2 border-blue-500">
        کالا های حراجی
      </div>
      <ProductsOnSale />
    </div>
  );
};

export default OnSalePage;
