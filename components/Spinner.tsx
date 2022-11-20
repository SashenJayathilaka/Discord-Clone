import { motion } from "framer-motion";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

type Props = {};

export default function Spinner({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex justify-center items-center"
    >
      <ThreeDots
        height="180"
        width="180"
        radius="9"
        color="#7289da"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </motion.div>
  );
}
