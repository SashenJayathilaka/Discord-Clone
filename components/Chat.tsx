import React from "react";
import { useSession } from "next-auth/react";
import moment from "moment";
import { motion } from "framer-motion";

type ChatProps = {
  chatImage: any;
  matchId: any;
  username: any;
  timestamp: any;
  message: any;
  profileImage: any;
};

const Chat: React.FC<ChatProps> = ({
  chatImage,
  matchId,
  username,
  timestamp,
  profileImage,
  message,
}) => {
  const { data: session }: any = useSession();

  return (
    <motion.div
      initial={{
        x: matchId === session?.user?.uid ? 200 : -200,
        opacity: 0,
      }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      className={
        matchId === session?.user?.uid
          ? `border-b border-gray-600 py-3 flex mb-4 text-sm bg-gray-600 rounded-md px-2`
          : `border-b border-gray-600 py-3 flex items-start mb-4 text-sm px-2`
      }
    >
      <img
        src={profileImage}
        className="cursor-pointer w-10 h-10 rounded-3xl mr-3"
      />
      <div className="flex-1 overflow-hidden">
        <div>
          <span className="font-bold text-red-300 cursor-pointer hover:underline">
            {username}
          </span>
          <span className="font-bold text-gray-400 text-xs pl-2">
            {moment(new Date(timestamp?.seconds * 1000)).fromNow()}
          </span>
        </div>
        {message && (
          <p className="text-white text-lg font-md leading-normal ">
            {message}
          </p>
        )}

        {chatImage && (
          <div className="items-center">
            <img
              src={chatImage}
              alt=""
              className="max-w-xs max-h-60 rounded-md border border-yellow-200 px-2 py-2"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default Chat;
