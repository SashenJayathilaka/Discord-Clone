import { signOut } from "next-auth/react";
import React from "react";

type LogOutProps = {};

const LogOut: React.FC<LogOutProps> = () => {
  return (
    <div className="">
      <button
        className="bg-gray-600 p-2 rounded-full text-gray-300 text-xs md:text-sm px-4 focus:outline-none"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};
export default LogOut;
