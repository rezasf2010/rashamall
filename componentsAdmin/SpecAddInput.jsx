"use client";
import { useState } from "react";

const AdminSpecAddInput = ({ specifications, setSpecifications }) => {
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newSpecifications = [...specifications];
    newSpecifications[index][name] = value;
    setSpecifications(newSpecifications);
  };

  const handleAddRow = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const handleRemoveRow = (index) => {
    const newSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecifications);
  };

  return (
    <div className="mb-4 p-4">
      <label className="flex  pr-2 text-gray-700 font-bold mb-2">
        مشخصات فنی
      </label>
      {specifications.map((spec, index) => (
        <div key={index} className="flex gap-2 mb-2 items-center">
          <input
            type="text"
            name="key"
            id="key"
            placeholder=" مشخصات فنی مثال: دور موتور"
            className="border border-gray-300 rounded w-full py-2 px-3  text-sm"
            value={spec.key}
            onChange={(e) => handleChange(index, e)}
          />
          <input
            type="text"
            name="value"
            id="value"
            placeholder="مقدار مثال: 1200 "
            className="border border-gray-300 rounded w-full py-2 px-3  text-sm"
            value={spec.value}
            onChange={(e) => handleChange(index, e)}
          />
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => handleRemoveRow(index)}
          >
            -
          </button>
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleAddRow}
      >
        +
      </button>
    </div>
  );
};

export default AdminSpecAddInput;
