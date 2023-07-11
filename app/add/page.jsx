"use client";

import Category from "@/components/Category";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CreateExpense = () => {
  const router = useRouter();
  const { user } = useSelector((store) => store.user);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState(false);
  const [category, setCategory] = useState("");
  const categories = [
    ["regular payments", 'mortgage, rent, taxes, insurance, debts, etc.'],
    ["utilities", 'cell phone, gas, electricity, water, internet, etc.'],
    ["transportation", 'public transport, personal transport, maintenance, etc.'],
    ["food", 'groceries, restaurants, food delivery, etc.'],
    ["hobbies", 'sports, social activities, domestic hobbies, etc.'],
    ["education", 'cources, books, mentors, etc.'],
    ["clothing and stuff", 'shoes, glasses, phones, pants, etc.'],
    ["savings and investments", 'retirements payments, stocks, funds, etc'],
    ["gifts and donations", 'charity, birhdays, holidays, etc.'],
    ["personal", 'haircuts, home stuff, medicines, etc.'],
    ["recreation", 'travel, entertainment, etc.'],
    ["family", 'kids, pets, parents, etc.'],
  ];
  const handleClick = async () => {
    if (!isNaN(price) && price !== "") {
      try {
        await addDoc(collection(db, "users", user.uid, "expenses"), {
          description: name,
          price: price,
          category: category,
          author: user.email,
          userId: user.uid,
          time: new Date(),
        });
      } catch (err) {
        console.error(err);
      }
      setName("");
      setPrice("");
      setCategory("");
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col w-[320px] sm:w-[520px] md:w-[680px] lg:w-[800px] gap-[40px] items-center pt-[120px] pb-[40px]">
        <div className="flex flex-col gap-[20px] md:flex-row">
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          placeholder="Price"
          className={`border-2 h-[50px] w-[250px] text-lg px-4 ${
            err && "border-red-300"
          }`}
          />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Description (optional)"
          className={`border-2 h-[50px] w-[250px] text-lg px-4 ${
            err && "border-red-300"
          }`}
          />
          </div>
        <div className="flex flex-wrap gap-[20px] justify-center">
          {categories &&
            categories.map((item) => {
              return (
                <Category
                  key={item[0]}
                  name={item[0]}
                  description={item[1]}
                  category={category}
                  setCategory={setCategory}
                />
              );
            })}
        </div>
        <button
          onClick={handleClick}
          className="rounded bg-green-400 p-4 w-[200px]"
        >
          Add expense
        </button>
      </div>
    </div>
  );
};
export default CreateExpense;
