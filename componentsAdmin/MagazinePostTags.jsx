const magazinePostTags = ({ tags, setTags }) => {
  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleChange = (index, event) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  return (
    <div className="mb-4 p-4">
      <label className="flex pr-2 text-gray-700 font-bold mb-2">تگ ها</label>
      {tags.map((tag, index) => (
        <div key={index} className="flex gap-2 mb-2 items-center">
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="تگ ها: مثال: کولر گازی، مقایسه، ..."
            className="border border-gray-300 rounded w-full py-2 px-3"
            value={tag}
            onChange={(e) => handleChange(index, e)}
          />
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => handleRemoveTag(index)}
          >
            -
          </button>
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleAddTag}
      >
        +
      </button>
    </div>
  );
};

export default magazinePostTags;
