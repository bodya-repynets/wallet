"use client";

import { db } from "@/firebase";
import { Dialog } from "@headlessui/react";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import ModalButton from "./ModalButton";

const AddModal = ({ category, isOpen, setIsOpen, setCategory }) => {
  const router = useRouter();
  const { user } = useSelector((store) => store.user);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState(false);
  const handleClick = async () => {
    if (!isNaN(price) && price !== "" && description.length < 20) {
      try {
        await addDoc(collection(db, "users", user.uid, "expenses"), {
          description: description,
          price: price,
          category: category,
          author: user.email,
          userId: user.uid,
          time: new Date(),
        });
      } catch (err) {
        console.error(err);
      }
      setDescription("");
      setPrice("");
      setCategory("");
      setIsOpen(false);
      router.push("/home");
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60"
    >
      <Dialog.Panel>
        <div className="flex flex-col w-screen h-screen md:w-full md:h-full gap-[30px] items-center justify-center bg-gradient-to-r from-slate-700 to-slate-800 p-[50px] md:rounded-xl">
          <div className="relative">
            <input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder=" "
              className={`border-b-2 bg-transparent text-white h-[50px] w-[250px] px-[10px] py-[13px] ${
                err ? "border-red-500" : "border-sky-500"
              } placeholder:opacity-0 peer focus:outline-none`}
            />
            <label
              htmlFor="price"
              className="text-xs absolute left-[4px] -top-[12px] peer-placeholder-shown:translate-y-[25px]
            peer-placeholder-shown:translate-x-[8px] text-slate-300 peer-placeholder-shown:text-base"
            >
              Price
            </label>
          </div>
          <div className="relative">
            <input
              defaultValue={category}
              type="text"
              placeholder=" "
              className={`border-b-2 bg-transparent text-white h-[50px] w-[250px] px-[10px] py-[13px] ${
                err ? "border-red-500" : "border-sky-500"
              } placeholder:opacity-0 peer focus:outline-none capitalize`}
              readOnly
            />
            <label
              className="text-xs absolute left-[4px] -top-[12px] peer-placeholder-shown:translate-y-[25px]
            peer-placeholder-shown:translate-x-[8px] text-slate-300 peer-placeholder-shown:text-base"
            >
              Category
            </label>
          </div>
          <div className="relative">
            <input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder=" "
              className={`border-b-2 text-white bg-transparent h-[50px] w-[250px] px-[10px] py-[13px] ${
                err ? "border-red-500" : "border-sky-500"
              } placeholder:opacity-0 peer focus:outline-none capitalize`}
            />
            <label
              htmlFor="description"
              className="text-xs absolute left-[4px] -top-[12px] peer-placeholder-shown:translate-y-[25px]
              peer-placeholder-shown:translate-x-[8px] text-slate-300 peer-placeholder-shown:text-base"
            >
              Description (optional)
            </label>
          </div>
          <div className="flex flex-row gap-[20px] mt-[50px]">
            <ModalButton
              action={() => {
                setIsOpen(false);
              }}
              name="Cancel"
              color={"red"}
            />
            <ModalButton
              action={handleClick}
              name="Add expense"
              color={"blue"}
            />
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
export default AddModal;
