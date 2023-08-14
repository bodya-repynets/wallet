"use client";

import InputComponent from "@/components/InputComponent";
import { auth, provider } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { setUser } from "@/redux/features/userSlice";

const AuthorizationPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const handleLoginWithGoogle = async () => {
    let resp;
    try {
      resp = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
    const { displayName, email, uid } = resp.user;
    const credentials = { displayName, email, uid };
    dispatch(setUser(credentials));
  };
  const handleClick = async () => {
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    function isValidPassword(password) {
      const passwordRegex = /^(?=.*[a-zA-Z]{4})(?=.*\d)[a-zA-Z\d]{6,}$/;
      return passwordRegex.test(password);
    }
    if (isValidEmail(email) && isValidPassword(password)) {
      let resp;
      try {
        resp = await signInWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
      } catch (error) {
        setErr("Invalid email or password");
        setTimeout(() => {
          setErr(false);
        }, 2000);
        console.log(error);
      }
    } else {
      setErr("Wrong email or password");
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col gap-[20px] h-screen justify-center items-center">
      <p className="text-white tracking-[4px] my-[30px] text-[24px] font-bold">
        Authorization
      </p>
      <InputComponent
        type={"email"}
        value={email}
        setValue={setEmail}
        err={err}
        id={"email"}
      />
      <InputComponent
        err={err}
        type={"password"}
        value={password}
        setValue={setPassword}
        id={"password1"}
      />
      <button
        className="tracking-[2px] text-white text-[20px] hover:scale-110 w-[200px] py-4 bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 rounded-full duration-200 my-[30px]"
        onClick={handleClick}
      >
        Login
      </button>
      <Link
        href="/registration"
        className="text-white tracking-wider hover:scale-110 duration-200"
      >
        Registration
      </Link>
      <button
        onClick={handleLoginWithGoogle}
        className="text-white hover:scale-110 duration-200"
      >
        Log in with Google{" "}
        <FcGoogle className="inline text-[28px] tracking-wider" />
      </button>
    </div>
  );
};
export default AuthorizationPage;
