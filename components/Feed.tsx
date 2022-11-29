import React, { useState } from "react";

import Hero from "./Hero";
import Featured from "./Featured";

type FeedProps = {};

const Feed: React.FC<FeedProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-[#393943] w-full px-5 pt-4">
      <Hero setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <Featured searchQuery={searchQuery} />
    </div>
  );
};
export default Feed;
