import React from "react";
import { motion } from "framer-motion";

import Groups from "./Groups";
import Discover from "./Discover";
import Feed from "./Feed";

type ContainerProps = {};

const Container: React.FC<ContainerProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex bg-[#393943]"
    >
      <Groups />
      <Discover />
      <Feed />
    </motion.div>
  );
};
export default Container;
