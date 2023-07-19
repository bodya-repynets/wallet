"use client";
import ExpenseItem from "@/components/ExpenseItem";
import { db } from "@/firebase";
import { calculateSums } from "@/redux/features/categoriesSlice";
import {
  setExpenses,
  setFilterToNull,
  showMore,
} from "@/redux/features/expensesSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeModal from "@/components/TimeModal";
import { AiOutlineCalendar } from "react-icons/ai";
import AddNew from "@/components/AddNew";

const AllExpenses = () => {
  const { user } = useSelector((store) => store.user);
  const { expenses } = useSelector((store) => store.expenses);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleMore = () => {
    if (expenses?.filtered) {
      dispatch(
        showMore({
          expenses: expenses.filtered,
          index: expenses.current.length + 1,
        })
      );
    } else {
      dispatch(
        showMore({ expenses: expenses.all, index: expenses.current.length + 1 })
      );
    }
  };
  useEffect(() => {
    if (user && !expenses.all) {
      const q = query(collection(db, "users", user.uid, "expenses"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let expensesArr = [];
        querySnapshot.forEach((doc) => {
          expensesArr.push({ ...doc.data(), id: doc.id });
        });
        const newArr = expensesArr.map((item) => {
          return { ...item, time: item.time.seconds };
        });

        const sortedArr = newArr.sort((a, b) => b.time - a.time);
        dispatch(calculateSums(sortedArr));
        dispatch(setExpenses(sortedArr));
      });
      return () => unsubscribe();
    }
    dispatch(setFilterToNull());
  }, [user]);
  return (
    <>
      <TimeModal showModal={showModal} setShowModal={setShowModal} />
      <div className="w-screen min-h-screen flex flex-col items-center">
        {expenses.current && (
          <div className="flex flex-col gap-[20px] py-[100px] items-center w-[100%] sm:w-[80%] lg:w-[60%] max-w-[650px]">
            <p className="text-white tracking-[4px] mt-[30px] text-[24px] font-bold">
              All expenses
            </p>
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 sm:rounded-2xl w-full h-[50px] flex items-center justify-around my-[20px]">
              <span className="text-white font-semibold">
                Expenses: {expenses.totals.quantity}
              </span>
              <span className="text-white font-semibold">
                Sum: ${expenses.totals.sum}
              </span>
              <button
                className="text-[28px] hover:text-[32px] duration-200 text-white bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 p-[11px]"
                onClick={() => setShowModal(true)}
              >
                <AiOutlineCalendar />
              </button>
            </div>
            {expenses?.filtered && (
              <div className="flex gap-[20px] justify-center items-center">
                <p className="text-white font-semibold">
                  {expenses.from} - {expenses.to}
                </p>
                <button
                  onClick={() => {
                    dispatch(setFilterToNull());
                    dispatch(setExpenses(expenses.all));
                  }}
                  className="duration-200 text-white bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 px-[10px] py-[5px] rounded-full"
                >
                  Reset filter
                </button>
              </div>
            )}
            <div className="flex flex-col gap-[20px] w-full items-center">
              {expenses?.current &&
                expenses.current.map((item) => {
                  return <ExpenseItem key={item.id} item={item} />;
                })}
            </div>
            {expenses?.filtered?.length > 15 &&
              expenses.filtered.length !== expenses.current.length && (
                <button
                  onClick={handleMore}
                  className="tracking-[2px] text-white text-[20px] hover:scale-110 w-[200px] py-4 bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 rounded-full duration-200 mt-[40px]"
                >
                  Show more
                </button>
              )}
            {expenses?.all.length > 15 &&
              !expenses?.filtered &&
              expenses.all.length !== expenses.current.length && (
                <button
                  onClick={handleMore}
                  className="tracking-[2px] text-white text-[20px] hover:scale-110 w-[200px] py-4 bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 rounded-full duration-200 mt-[40px]"
                >
                  Show more
                </button>
              )}
          </div>
        )}
        <AddNew />
      </div>
    </>
  );
};
export default AllExpenses;
