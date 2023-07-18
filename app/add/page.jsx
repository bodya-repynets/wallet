"use client";

import Category from "@/components/Category";
import { useState } from "react";
import AddModal from "@/components/AddModal";
import { categories } from "@/constants";

const CreateExpense = () => {
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col w-[100%] max-w-[1400px] gap-[50px] items-center py-[100px]">
          <p className="text-white tracking-[4px] mt-[30px] text-[24px] font-bold">
            Select category
          </p>
          <div className="flex flex-wrap gap-[30px] justify-center">
            {categories &&
              categories.map((item) => {
                return (
                  <Category
                    key={item[0]}
                    name={item[0]}
                    description={item[1]}
                    setCategory={setCategory}
                    setIsOpen={setIsOpen}
                  />
                );
              })}
          </div>
        </div>
        <AddModal
          category={category}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setCategory={setCategory}
        />
      </div>
    </>
  );
};
export default CreateExpense;
