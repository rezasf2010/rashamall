import Breadcrumb from "@/components/Breadcrumb";

const ComparisonPage = () => {
  const pathSegments = [
    { name: "خانه", link: "/" },
    { name: "مقایسه کالا ها" },
  ];

  return (
    <div className="w-full flex flex-col items-center my-6 md:items-start md:mr-12">
      <Breadcrumb pathSegments={pathSegments} />
      <div className="flex p-4 text-gray-700 text-2xl font-bold border-b-2 border-blue-500">
        مقایسه کالا ها
      </div>
    </div>
  );
};

export default ComparisonPage;
