"use client";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { setUser, deleteUser } from "@/redux/features/userSlice";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const handleLogout = () => {
    signOut(auth).then((result) => {
      console.log(result);
    });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid } = user;
        const credentials = { displayName, email, uid };
        dispatch(setUser(credentials));
        router.push(pathname);
      } else {
        dispatch(deleteUser());
        router.push("/authorization");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <div className="absolute h-[80px] w-screen flex items-center justify-around">
      <span>Wallet</span>
      {user && (
        <div className="flex items-center gap-[20px]">
          <>
            <Link href={"/"}>Home</Link>
            <Link href={"/add"}>Add expense</Link>
            <button onClick={handleLogout}>Log out</button>
          </>
        </div>
      )}
    </div>
  );
};
export default Navbar;
