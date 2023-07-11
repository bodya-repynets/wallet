"use client";
import InputComponent from "@/components/InputComponent";
import MainButton from "@/components/MainButton";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const RegistrationPage = () => {
  const { user } = useSelector((store) => store.user);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState(false);
  const handleClick = async () => {
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    function isValidPassword(password) {
      const passwordRegex = /^(?=.*[a-zA-Z]{4})(?=.*\d)[a-zA-Z\d]{6,}$/;
      return passwordRegex.test(password);
    }
    if (
      isValidEmail(email) &&
      isValidPassword(password1) &&
      password1 === password2
    ) {
      try {
        const resp = await createUserWithEmailAndPassword(
          auth,
          email,
          password1
        );
      } catch (error) {
        console.log(error);
      }
      await setDoc(doc(db, "users", resp.user.uid), {
        email: resp.user.email,
      });

      setEmail("");
      setPassword1("");
      setPassword2("");
      navigate("/home");
    } else {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col gap-8 h-screen justify-center items-center">
      <p>Registration</p>
      <InputComponent
        type={"email"}
        value={email}
        setValue={setEmail}
        err={err}
      />
      <InputComponent
        type={"password"}
        value={password1}
        setValue={setPassword1}
        err={err}
      />
      <InputComponent
        type={"password"}
        value={password2}
        setValue={setPassword2}
      />
      <MainButton text={"Register"} action={handleClick} />
      <Link href="/authorization">Authorization</Link>
    </div>
  );
};
export default RegistrationPage;
