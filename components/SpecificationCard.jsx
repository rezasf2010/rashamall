const SpecificationCard = ({ spec }) => {
  return (
    <div className=" bg-gray-200 px-3 py-2 flex flex-col min-w-36 rounded-lg gap-2">
      <p className="text-xs text-gray-500">{spec.key}</p>
      <p className="text-sm font-medium text-gray-900">{spec.value}</p>
    </div>
  );
};

export default SpecificationCard;
