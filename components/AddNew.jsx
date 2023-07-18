import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
const AddNew = () => {
  return (
    <Link
      href={"/add"}
      className="fixed bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 rounded-full duration-200 w-[80px] h-[80px] md:w-[100px] md:h-[100px] bottom-[20px] right-[20px] sm:bottom-[50px] sm:right-[50px] flex justify-center items-center text-[50px] text-white"
    >
      <AiOutlinePlus />
    </Link>
  );
};
export default AddNew;
