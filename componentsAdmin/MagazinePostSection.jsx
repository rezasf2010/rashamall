"use client";

const MagazinePostSection = ({ sections, setSections }) => {
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newSections = [...sections];
    newSections[index][name] = value;
    setSections(newSections);
  };

  const handleAddRow = () => {
    setSections([...sections, { title: "", paragraph: "" }]);
  };

  const handleRemoveRow = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };
  return (
    <div className="mb-4 p-4">
      <label className="flex  pr-2 text-gray-700 font-bold mb-2">
        پاراگراف ها
      </label>
      {sections.map((section, index) => (
        <div key={index} className="flex flex-col gap-2 mb-2 justify-start">
          <div className="flex gap-2">
            <input
              name="title"
              id="title"
              placeholder="عنوان پاراگراف: کولرگازی خارجی ال جی"
              className="border border-gray-300 rounded w-full py-2 px-3 text-sm"
              value={section.title}
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

          <textarea
            name="paragraph"
            id="paragraph"
            rows="4"
            placeholder="متن پاراگرف: برند ال جی که همه با آن آشنایی دارند یکی از بهترین برندهای خارجی است ..."
            className="border border-gray-300 rounded w-full py-2 px-3 text-sm resize-none"
            value={section.paragraph}
            onChange={(e) => handleChange(index, e)}
          ></textarea>
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

export default MagazinePostSection;
