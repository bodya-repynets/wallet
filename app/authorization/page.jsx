"use client";

import InputComponent from "@/components/InputComponent";
import MainButton from "@/components/MainButton";
import { auth, provider } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { setUser } from "@/redux/features/userSlice";

const AuthorizationPage = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, uid } = result.user;
        const credentials = { displayName, email, uid };
        dispatch(setUser(credentials));
      })
      .catch((err) => console.log(err));
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
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
      }
      setEmail("");
      setPassword("");
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col gap-8 h-screen justify-center items-center">
      <p>Authorization</p>
      <InputComponent
        type={"email"}
        value={email}
        setValue={setEmail}
        err={err}
      />
      <InputComponent
        err={err}
        type={"password"}
        value={password}
        setValue={setPassword}
      />
      <MainButton text={"Log in"} action={handleClick} />
      <Link href="/registration">Registration</Link>
      <button onClick={handleLoginWithGoogle}>
        Log in with Google <FcGoogle className="inline text-[28px]" />
      </button>
    </div>
  );
};
export default AuthorizationPage;
