"use client";
import PieChart from "@/components/PieChart";
import { db } from "@/firebase";
import { calculateSums } from "@/redux/features/categoriesSlice";
import { setExpenses } from "@/redux/features/expensesSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExpenseItem from "@/components/ExpenseItem";
import { useRouter } from "next/navigation";
import AddNew from "@/components/AddNew";

const Home = () => {
  const router = useRouter();
  const { user } = useSelector((store) => store.user);
  const { expenses } = useSelector((store) => store.expenses);
  const dispatch = useDispatch();
  const goToAll = () => {
    router.push("/all");
  };
  useEffect(() => {
    if (user) {
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
  }, [user]);
  return (
    <div className="pt-[120px] pb-[80px] flex flex-col gap-[40px] items-center min-h-screen">
      <div className="w-full sm:w-[80%] max-w-[500px] sm:max-w-[650px] sm:px-[75px] lg:w-[60%] bg-black bg-opacity-30 sm:rounded-2xl py-[20px] flex flex-col items-center gap-[20px]">
        <PieChart />
        <span className="text-white text-xs">* statistics for last week</span>
      </div>
      {expenses.last && (
        <div className="w-[100%] sm-[80%] lg:w-[60%] flex flex-col gap-[50px] items-center">
          <div className="flex flex-col w-full gap-[20px] items-center">
            {expenses.last.map((item) => {
              return <ExpenseItem key={item.id} item={item} />;
            })}
          </div>
          <button
            className="tracking-[2px] text-white text-[20px] hover:scale-110 w-[200px] py-4 bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 rounded-full duration-200"
            onClick={goToAll}
          >
            Check all
          </button>
          <AddNew />
        </div>
      )}
    </div>
  );
};
export default Home;
