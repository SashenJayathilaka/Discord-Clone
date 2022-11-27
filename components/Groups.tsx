import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AiFillCompass } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { firestore } from "../firebase/firebase";
import SideGroupList from "./SideGroupList";

const sideBarImage = [
  "https://i.postimg.cc/ZK7ngyd5/img1.png",
  "https://i.postimg.cc/Gm623wz0/img2.png",
  "https://i.postimg.cc/qRTvns9j/img3.png",
  "https://i.postimg.cc/W4r4hWfd/img4.png",
];

type GroupsProps = {};

const Groups: React.FC<GroupsProps> = () => {
  const { data: session }: any = useSession();
  const [cardData, setCardData] = useState<any[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, "discord"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setCardData(snapshot.docs);
        }
      ),
    [firestore]
  );

  return (
    <div className="hidden sm:flex bg-[#212226] w-[6rem] shrink-0 h-screen sticky top-0 pt-6 overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col items-center w-full space-y-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#36393f] p-1 rounded-[1.3rem] cursor-pointer"
        >
          <Link href="/">
            <img
              src="https://i.postimg.cc/wj1MdTXc/dc.png"
              className="w-12 h-12 rounded-full text-white brightness-[80%]"
            />
          </Link>
        </motion.div>{" "}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#7289dc] p-3 rounded-[1.3rem] cursor-pointer"
        >
          <AiFillCompass className="w-8 h-8 rounded-full text-white" />
        </motion.div>
        <div className="space-y-2 pt-4">
          {cardData.map((card) => (
            <div key={card.id}>
              {card.data().userId === session?.user?.uid && (
                <SideGroupList card={card} sideBarImage={sideBarImage} />
              )}
            </div>
          ))}
        </div>
        <Link href="/community/createCommunity">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#36393f] p-4 rounded-full"
          >
            <FiPlus className="w-6 h-6 rounded-full text-green-700 cursor-pointer" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
};
export default Groups;
