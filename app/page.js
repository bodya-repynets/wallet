"use client";
import PieChart from "@/components/PieChart";
import { db } from "@/firebase";
import { calculateSums } from "@/redux/features/categoriesSlice";
import { setExpenses } from "@/redux/features/expensesSlice";
import { collection, onSnapshot, query } from "firebase/firestore";
import moment from "moment";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const { expenses } = useSelector((store) => store.expenses);
  const { categories } = useSelector((store) => store.categories);
  const dispatch = useDispatch();
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
        dispatch(calculateSums(newArr));
        dispatch(setExpenses(newArr));
      });
      return () => unsubscribe();
    }
  }, [user]);
  return (
    <div className="pt-[120px] pb-[80px] flex flex-col lg:flex-row gap-[100px] justify-center items-center lg:items-start">
      <div className="w-[400px] h-[400px]">
        <PieChart />
      </div>
      {expenses && (
        <div className="flex flex-col gap-[40px]">
          <p className="text-center">List of expenses</p>
          {expenses.map((item) => {
            return (
              <div
                key={item.id}
                className="flex w-[400px] justify-between flex-col gap-[20px]"
              >
                <div className="w-full flex justify-between">
                  <span className="text-xs text-slate-500">
                    {moment(new Date(item.time * 1000)).format("HH:mm")}
                  </span>
                  <span className="text-xs text-slate-500">
                    {moment(new Date(item.time * 1000)).format("DD.MM.YYYY")}
                  </span>
                </div>
                <div className="w-full flex justify-between border-b-2 pb-[20px] border-slate-300">
                  <span>$ {item.price}</span>
                  <span className="text-slate-500">{item.description}</span>
                  <span>{item.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Home;
