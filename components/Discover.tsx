import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { AiFillCompass } from "react-icons/ai";
import {
  BsFillEmojiSmileFill,
  BsFillPlayCircleFill,
  BsMusicNoteBeamed,
} from "react-icons/bs";
import { FaGraduationCap, FaHeadphones } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import { GiConsoleController } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { TbAtom } from "react-icons/tb";

import LogOut from "./LogOut";
import Topic from "./Topic";

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

  const { data: session }: any = useSession();
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="hidden xl:flex flex-col justify-between bg-[#303136] w-[18rem] shrink-0  h-screen sticky top-0 overflow-y-scroll scrollbar-hide">
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
            src={session?.user?.image as string}
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className=" pl-2">
            {(session?.user?.name?.length as any) < 12 ? (
              <p>{session?.user?.name}</p>
            ) : (
              <p>
                {session?.user?.name?.slice(0, 12)}
                {"..."}
              </p>
            )}

            <p className="text-[14px] text-gray-400">
              #{session?.user?.uid?.slice(0, 8)}
            </p>
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
