"use client";
const Category = ({ name, setCategory, description, setIsOpen }) => {
  const handleClick = () => {
    setCategory(name);
    setIsOpen(true);
  };
  return (
    <button
      onClick={handleClick}
      className={
        "bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 shadow-xl hover:scale-110 duration-200 rounded p-[20px] w-[300px] h-[150px] flex flex-col justify-center items-center gap-[15px]"
      }
    >
      <p className="capitalize text-white font-semibold tracking-wider">
        {name}
      </p>
      <p className="text-xs text-white">{description}</p>
    </button>
  );
};
export default Category;
