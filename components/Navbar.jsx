"use client";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { setUser, deleteUser } from "@/redux/features/userSlice";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        const credentials = { displayName, email, uid, photoURL };
        dispatch(setUser(credentials));
        if (pathname !== "/" && pathname !== "/registration") {
          router.push(pathname);
        } else {
          router.push("/home");
        }
      } else {
        dispatch(deleteUser());
        router.push("/");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <div className="absolute h-[80px] w-screen flex items-center justify-around font-chela bg-gradient-to-r from-slate-700 to-slate-800">
      <Link
        href={"/home"}
        className="text-[36px] text-white hover:scale-125 tracking-[2px] duration-300"
      >
        Wallet
      </Link>
      {user && (
        <>
          <div className="items-center gap-[30px] hidden md:flex text-[20px] text-white">
            <Link
              className="hover:text-white hover:scale-125 tracking-[2px] duration-300"
              href={"/home"}
            >
              Home
            </Link>
            <Link
              className="hover:text-white hover:scale-125 tracking-[2px] duration-300"
              href={"/all"}
            >
              Expenses
            </Link>
            <Link
              className="hover:text-white hover:scale-125 tracking-[2px] duration-300"
              href={"/add"}
            >
              Add expense
            </Link>
            <button
              className="hover:text-white hover:scale-125 tracking-[2px] duration-300"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
          <DropdownMenu handleLogout={handleLogout} />
        </>
      )}
    </div>
  );
};
export default Navbar;
