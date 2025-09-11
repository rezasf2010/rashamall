const AdminServicesAddInput = ({ services, setServices }) => {
  const handleAddService = () => {
    setServices([...services, '']);
  };

  const handleRemoveService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleChange = (index, event) => {
    const newServices = [...services];
    newServices[index] = event.target.value;
    setServices(newServices);
  };

  return (
    <div className="mb-4 p-4">
      <label className="flex pr-2 text-gray-700 font-bold mb-2">خدمات</label>
      {services.map((service, index) => (
        <div key={index} className="flex gap-2 mb-2 items-center">
          <input
            type="text"
            id="services"
            name="services"
            placeholder="خدمات مثال: 18 ماه گارانتی"
            className="border border-gray-300 rounded w-full py-2 px-3"
            value={service}
            onChange={(e) => handleChange(index, e)}
          />
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => handleRemoveService(index)}
          >
            -
          </button>
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleAddService}
      >
        +
      </button>
    </div>
  );
};

export default AdminServicesAddInput;
