import { useState } from "react";

const FeaturesAddInput = ({ features, setFeatures }) => {
  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleChange = (index, event) => {
    const newFeatures = [...features];
    newFeatures[index] = event.target.value;
    setFeatures(newFeatures);
  };

  return (
    <div className="mb-4 p-4">
      <label className="flex pr-2 text-gray-700 font-bold mb-2">امکانات</label>
      {features.map((feature, index) => (
        <div key={index} className="flex gap-2 mb-2 items-center">
          <input
            type="text"
            id="features"
            name="features"
            placeholder="امکانات مثال: مجهز به قفل کودک"
            className="border border-gray-300 rounded w-full py-2 px-3"
            value={feature}
            onChange={(e) => handleChange(index, e)}
          />
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => handleRemoveFeature(index)}
          >
            -
          </button>
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleAddFeature}
      >
        +
      </button>
    </div>
  );
};

export default FeaturesAddInput;
