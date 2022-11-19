import React from "react";

import Groups from "./Groups";
import Discover from "./Discover";
import Feed from "./Feed";

type ContainerProps = {};

const Container: React.FC<ContainerProps> = () => {
  return (
    <div className="flex bg-[#393943]">
      <Groups />
      <Discover />
      <Feed />
    </div>
  );
};
export default Container;
