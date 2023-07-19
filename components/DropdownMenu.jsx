import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
const DropdownMenu = ({ handleLogout }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="md:hidden">
      <button className="text-[40px] text-white" onClick={() => setShow(!show)}>
        <AiOutlineMenu />
      </button>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen bg-gradient-to-r from-slate-600 to-slate-700"
      >
        <Dialog.Panel>
          <div className="flex flex-col gap-[50px] items-center justify-center rounded-2">
            <Link
              className="tracking-[5px] font-bold uppercase text-white hover:scale-110 duration-200 w-[200px] h-[40px] text-center py-[8px]"
              onClick={() => setShow(false)}
              href={"/home"}
            >
              Home
            </Link>
            <Link
              className="tracking-[5px] font-bold uppercase text-white hover:scale-110 duration-200 w-[200px] h-[40px] text-center py-[8px]"
              onClick={() => setShow(false)}
              href={"/all"}
            >
              Expenses
            </Link>
            <Link
              className="tracking-[5px] font-bold uppercase text-white hover:scale-110 duration-200 w-[200px] h-[40px] text-center py-[8px]"
              onClick={() => setShow(false)}
              href={"/add"}
            >
              Add expense
            </Link>
            <button
              className="tracking-[5px] font-bold uppercase text-white hover:scale-110 duration-200 w-[200px] h-[40px]"
              onClick={() => {
                handleLogout();
                setShow(false);
              }}
            >
              Log out
            </button>
          </div>
          <button
            className="absolute top-[50px] right-[50px] text-white text-[40px] hover:scale-110 duration-200"
            onClick={() => setShow(false)}
          >
            <AiOutlineClose />
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};
export default DropdownMenu;
