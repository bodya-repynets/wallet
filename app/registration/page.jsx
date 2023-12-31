"use client";
import InputComponent from "@/components/InputComponent";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegistrationPage = () => {
  const router = useRouter();
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
      let resp;
      try {
        resp = await createUserWithEmailAndPassword(auth, email, password1);
      } catch (error) {
        console.log(error);
      }
      await setDoc(doc(db, "users", resp.user.uid), {
        email: resp.user.email,
      });

      setEmail("");
      setPassword1("");
      setPassword2("");
      router.push("/home");
    } else {
      setErr("Invalid data or passwords do not match");
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col gap-[20px] h-screen justify-center items-center">
      <p className="text-white tracking-[4px] my-[30px] text-[24px] font-bold">
        Registration
      </p>
      <InputComponent
        type={"email"}
        value={email}
        setValue={setEmail}
        err={err}
        id={"email"}
      />
      <InputComponent
        type={"password"}
        value={password1}
        setValue={setPassword1}
        err={err}
        id={"password1"}
      />
      <InputComponent
        type={"password"}
        value={password2}
        setValue={setPassword2}
        err={err}
        id={"password2"}
      />
      <button
        className="tracking-[2px] text-white text-[20px] hover:scale-110 w-[200px] py-4 bg-gradient-to-r rounded-full from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 duration-200 my-[30px]"
        onClick={handleClick}
      >
        Register
      </button>
      <Link
        href="/"
        className="text-white tracking-wider hover:scale-110 duration-200"
      >
        Authorization
      </Link>
    </div>
  );
};
export default RegistrationPage;
