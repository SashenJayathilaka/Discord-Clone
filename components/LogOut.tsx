import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";

type LogOutProps = {};

const LogOut: React.FC<LogOutProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    } else return;
  }, [user]);

  return (
    <div className="">
      <button
        className="bg-gray-600 p-2 rounded-full text-gray-300 text-xs md:text-sm px-4 focus:outline-none"
        onClick={logout}
      >
        Sign Out
      </button>
    </div>
  );
};
export default LogOut;
