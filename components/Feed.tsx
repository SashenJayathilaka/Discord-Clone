import React from "react";

import Hero from "./Hero";
import Featured from "./Featured";

type FeedProps = {};

const Feed: React.FC<FeedProps> = () => {
  return (
    <div className="bg-[#393943] w-full px-5 pt-4">
      <Hero />
      <Featured />
    </div>
  );
};
export default Feed;
