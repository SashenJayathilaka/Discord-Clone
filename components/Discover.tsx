import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { AiFillCompass } from "react-icons/ai";
import { GiConsoleController } from "react-icons/gi";
import {
  BsMusicNoteBeamed,
  BsFillPlayCircleFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { TbAtom } from "react-icons/tb";
import { FiMonitor } from "react-icons/fi";
import { MdKeyboardVoice } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import Topic from "./Topic";
import LogOut from "./LogOut";
import { auth } from "../firebase/firebase";

type DiscoverProps = {};

const Discover: React.FC<DiscoverProps> = () => {
  const discoverData = [
    { title: "Home", icon: <AiFillCompass />, isNavigate: true },
    { title: "Gaming", icon: <GiConsoleController />, isNavigate: false },
    { title: "Music", icon: <BsMusicNoteBeamed />, isNavigate: true },
    { title: "Education", icon: <FaGraduationCap />, isNavigate: false },
    { title: "Science & tech", icon: <TbAtom />, isNavigate: true },
    {
      title: "Content Creator",
      icon: <BsFillPlayCircleFill />,
      isNavigate: false,
    },
    {
      title: "Anime & Manga",
      icon: <BsFillEmojiSmileFill />,
      isNavigate: true,
    },
    { title: "Movies & TV", icon: <FiMonitor />, isNavigate: false },
  ];

  const [user] = useAuthState(auth);
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="hidden xl:flex flex-col justify-between bg-[#303136] w-[18rem] shrink-0  h-screen sticky top-0">
      <div className="p-4">
        <p className="text-white font-bold text-[24px]">Discover</p>

        <div className="mt-4 space-y-4">
          {discoverData.map((data, index) => (
            <Topic
              key={index}
              title={data.title}
              icon={data.icon}
              isNavigate={data.isNavigate}
            />
          ))}
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-[#292b2f] h-[5rem] flex text-white/80 items-center px-4 justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => (isShow ? setIsShow(false) : setIsShow(true))}
        >
          <img
            src={user?.photoURL as string}
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className=" pl-2">
            <p>{user?.displayName}</p>
            <p className="text-[14px] text-gray-400">#12345</p>
          </div>
        </div>
        {isShow ? (
          <div className=" flex space-x-3 text-[20px]">
            <LogOut />
          </div>
        ) : (
          <div className=" flex space-x-3 text-[20px]">
            <MdKeyboardVoice />
            <FaHeadphones />
            <IoMdSettings />
          </div>
        )}
      </div>
    </div>
  );
};
export default Discover;
