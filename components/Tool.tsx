import React from "react";

type ToolProps = {
  title: any;
  icon: any;
};

const Tool: React.FC<ToolProps> = ({ title, icon }) => {
  return (
    <div className="flex text-white/50 items-center text-[20px]   ">
      <button className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-2.5 rounded-[0.4rem] font-semibold duration-100 ease-out ">
        <div className="pl-4 text-[25px]">{icon}</div>
        <p className="ml-2">{title}</p>
      </button>
    </div>
  );
};
export default Tool;
