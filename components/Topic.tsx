import React from "react";
import { motion } from "framer-motion";

type TopicProps = {
  title: any;
  icon: any;
  isNavigate: boolean;
};

const Topic: React.FC<TopicProps> = ({ title, icon, isNavigate }) => {
  return (
    <div className="flex text-white/50 items-center text-[20px]   ">
      <motion.button
        className="flex items-center hover:bg-[#7289dc] hover:text-white focus:bg-[#7289dc] focus:text-white  w-full py-2.5 rounded-[0.4rem] font-semibold duration-100 ease-out "
        initial={{
          x: isNavigate ? 200 : -200,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <div className="pl-4 text-[25px]">{icon}</div>
        <p className="ml-2">{title}</p>
      </motion.button>
    </div>
  );
};
export default Topic;
