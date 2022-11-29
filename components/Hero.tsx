import React from "react";

import { FiSearch } from "react-icons/fi";

type HeroProps = {
  setSearchQuery: any;
  searchQuery: string;
};

const Hero: React.FC<HeroProps> = ({ setSearchQuery, searchQuery }) => {
  return (
    <div className="relative  h-[13rem] sm:h-[16rem]  md:h-[19rem] rounded-[0.3rem] z-10">
      <div className="absolute  flex   w-full ">
        <img
          src="https://i.postimg.cc/sg5dkv6h/hero.jpg"
          className="object-cover w-full rounded-[0.3rem] h-[13rem]  md:h-[19rem] sm:h-[16rem]  "
        />
      </div>

      <div className="absolute  flex   w-full h-full bg-black/20 z-10 "></div>

      <div className="relative z-20   flex flex-col items-center justify-center  h-full font-bold text-white  pb-0 space-y-2">
        <p className="text-[19px] md:text-[24px] font-black">
          Find your community on Discord
        </p>
        <p className="pb-2 text-[13.5px] md:text-[17px]    text-white/70">
          {`From gaming, to music, to study, there's a place for you.`}
        </p>
        <div className="relative flex items-center      mb-4">
          <input
            value={searchQuery}
            type="search"
            placeholder="Explore servers"
            className="rounded-[0.3rem] pl-3 placeholder:text-[14px]  md:placeholder:text-[16px] placeholder:text-gray-500 outline-0 py-2 md:py-3 w-[25rem] md:w-[35rem] text-black"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute   text-black right-2" />
        </div>
      </div>
    </div>
  );
};
export default Hero;
