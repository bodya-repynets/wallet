"use client";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

const ExpenseItem = ({ item }) => {
  const deleteItem = async (id, userId) => {
    await deleteDoc(doc(db, "users", userId, "expenses", id));
  };

  return (
    <div className="flex w-full max-w-[650px] justify-between items-center flex-col gap-[30px] relative bg-black bg-opacity-30 px-[30px] sm:px-[50px] sm:rounded-xl shadow-xl py-[30px]">
      <div className="w-full flex justify-between">
        <span className="text-xs text-slate-300">
          {moment(new Date(item.time * 1000)).format("HH:mm")}
        </span>
        <span className="text-xs text-slate-300">
          {moment(new Date(item.time * 1000)).format("DD.MM.YYYY")}
        </span>
      </div>
      <div className="w-full flex justify-between items-center">
        <span className="capitalize font-bold text-white">$ {item.price}</span>
        <span className="capitalize font-bold text-white">{item.category}</span>
        <button
          onClick={() => deleteItem(item.id, item.userId)}
          className="text-[32px] text-white hover:scale-110 duration-200"
        >
          <AiOutlineDelete />
        </button>
      </div>
      <span className="text-slate-300 capitalize text-xs">
        {item.description}
      </span>
    </div>
  );
};
export default ExpenseItem;
