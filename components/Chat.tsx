import React from "react";

type ChatProps = {
  isTrue: boolean;
};

const Chat: React.FC<ChatProps> = ({ isTrue }) => {
  return (
    <div
      className={
        isTrue
          ? `border-b border-gray-600 py-3 flex items-start mb-4 text-sm`
          : `border-b border-gray-600 py-3 flex mb-4 text-sm bg-gray-500 rounded-md`
      }
    >
      <img
        src="https://cdn.discordapp.com/embed/avatars/1.png"
        className="cursor-pointer w-10 h-10 rounded-3xl mr-3"
      />
      <div className="flex-1 overflow-hidden">
        <div>
          <span className="font-bold text-red-300 cursor-pointer hover:underline">
            User
          </span>
          <span className="font-bold text-gray-400 text-xs">11:50</span>
        </div>
        <p className="text-white leading-normal">Discord is awesome!</p>
        <div className="items-center">
          <img
            src="https://th.bing.com/th/id/OIP.u5jd2IbRxY-2XbqPYC4AAgHaEo?pid=ImgDet&rs=1"
            alt=""
            className="max-w-sm h-auto  rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
export default Chat;
