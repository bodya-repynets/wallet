"use client";
const Category = ({ name, category, setCategory, description }) => {
  const handleClick = () => {
    if (category === name) {
      setCategory("");
    } else {
      setCategory(name);
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`bg-gray-200 rounded p-4 w-[150px] ${
        category === name && 'bg-blue-300'
      }`}
    >
      <p>{name}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </button>
  );
};
export default Category;
