import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { FaHeadphones } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";

import { Book, Chevron, Hashtag, Speakerphone } from "../icons";

type ServerToolBarProps = {};

const ServerToolBar: React.FC<ServerToolBarProps> = () => {
  const { data: session }: any = useSession();
  const [internal, setinternal] = useState(false);
  const [botChat, setBotChat] = useState(false);
  const [isShow, setIsShow] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="hidden xl:flex flex-col justify-between bg-[#303136] w-[18rem] shrink-0  h-screen sticky top-0"
    >
      <div className="p-4">
        <div className="flex gap-4 items-center text-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>

          <p className="text-white font-bold text-[18px]">Discord Server</p>
        </div>

        <hr />

        <div className="mt-4">
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="text-[18px]">
                <Book className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px]">Welcome</p>
            </button>
          </div>
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="text-[18px]">
                <Speakerphone className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px]">announcement</p>
            </button>
          </div>
        </div>
        {/* first one */}
        <div className="mt-4">
          <div className="flex text-white/50 items-center text-[20px]">
            <button
              className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out "
              onClick={() =>
                internal ? setinternal(false) : setinternal(true)
              }
            >
              <div className="text-[18px]">
                {internal ? (
                  <Chevron className="w-5 h-5" />
                ) : (
                  <Chevron className="w-5 h-5 -rotate-90" />
                )}
              </div>
              <p className="ml-2  text-[15px]">GENERAL DISCUSSION</p>
            </button>
          </div>
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="ml-4 text-[18px]">
                <Hashtag className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px] text-white">roles</p>
            </button>
          </div>

          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="ml-4 text-[18px]">
                <Hashtag className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px] text-white">content-share</p>
            </button>
          </div>
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="ml-4 text-[18px]">
                <Hashtag className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px] text-white">help</p>
            </button>
          </div>
          {internal && (
            <div className="flex text-white/50 items-center text-[20px]">
              <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
                <div className="ml-4 text-[18px]">
                  <Hashtag className="w-5 h-5" />
                </div>
                <p className="ml-2  text-[15px]">internal</p>
              </button>
            </div>
          )}
        </div>
        {/* first one end*/}
        {/* second one */}
        <div className="mt-4">
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="text-[18px]">
                <Chevron className="w-5 h-5 -rotate-90" />
              </div>
              <p className="ml-2  text-[15px]">COMMUNITY</p>
            </button>
          </div>
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="ml-4 text-[18px]">
                <Hashtag className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px] text-white">general</p>
            </button>
          </div>
        </div>
        {/* second one end*/}
        {/* third one */}
        <div className="mt-4">
          <div className="flex text-white/50 items-center text-[20px]">
            <button
              className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out "
              onClick={() => (botChat ? setBotChat(false) : setBotChat(true))}
            >
              <div className="text-[18px]">
                {botChat ? (
                  <Chevron className="w-5 h-5" />
                ) : (
                  <Chevron className="w-5 h-5 -rotate-90" />
                )}
              </div>
              <p className="ml-2  text-[15px]">DISSCUSSION</p>
            </button>
          </div>
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="ml-4 text-[18px]">
                <Hashtag className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px] text-white">ideas</p>
            </button>
          </div>
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="ml-4 text-[18px]">
                <Hashtag className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px] text-white">first-timers</p>
            </button>
          </div>
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="ml-4 text-[18px]">
                <Hashtag className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px] text-white">speaking</p>
            </button>
          </div>
          <div className="flex text-white/50 items-center text-[20px]">
            <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
              <div className="ml-4 text-[18px]">
                <Hashtag className="w-5 h-5" />
              </div>
              <p className="ml-2  text-[15px] text-white">support</p>
            </button>
          </div>
          {botChat && (
            <div className="flex text-white/50 items-center text-[20px]">
              <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-1 rounded-[0.4rem] font-semibold duration-100 ease-out ">
                <div className="ml-4 text-[18px]">
                  <Hashtag className="w-5 h-5" />
                </div>
                <p className="ml-2 text-[15px]">botchat</p>
              </button>
            </div>
          )}
        </div>
        {/* third one end*/}
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
        <div className=" flex space-x-3 text-[20px]">
          <MdKeyboardVoice />
          <FaHeadphones />
          <IoMdSettings />
        </div>
      </div>
    </motion.div>
  );
};
export default ServerToolBar;
