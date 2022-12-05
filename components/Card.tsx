import { faker } from "@faker-js/faker";
import { motion } from "framer-motion";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const sideBarImage = [
  "https://i.postimg.cc/ZK7ngyd5/img1.png",
  "https://i.postimg.cc/Gm623wz0/img2.png",
  "https://i.postimg.cc/qRTvns9j/img3.png",
  "https://i.postimg.cc/W4r4hWfd/img4.png",
];

const posterCardImage = [
  "https://i.postimg.cc/vTB3gcfP/background.webp",
  "https://i.postimg.cc/Wp6PYDyq/background2.jpg",
  "https://i.postimg.cc/k4WdmDXZ/bg01.jpg",
  "https://i.postimg.cc/1XP15P8z/bg03.jpg",
  "https://i.postimg.cc/3NB5k6GF/bg04.jpg",
];

type CardProps = {
  serverName: any;
  avatarImage: any;
  bannerImage: any;
  description: any;
  id: any;
};

const Card: React.FC<CardProps> = ({
  serverName,
  avatarImage,
  description,
  bannerImage,
  id,
}) => {
  const { data: session }: any = useSession();
  const router = useRouter();

  const handleNavigatePage = () => {
    if (session) {
      router.push({
        pathname: `/chat/${id}`,
        query: {
          docId: id.toString(),
        },
      });
    } else return;
  };

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full cursor-pointer"
      onClick={handleNavigatePage}
    >
      <div className="h-40 flex w-full cursor-pointer">
        {bannerImage ? (
          <img
            src={bannerImage}
            className="rounded-t-[0.8rem] object-cover w-full"
          />
        ) : (
          <img
            src={shuffle(posterCardImage).pop()}
            className="rounded-t-[0.8rem] object-cover w-full"
          />
        )}
      </div>
      <div className="bg-[#292b2f] relative h-[11.5rem] px-[1rem] rounded-b-[0.8rem] ">
        <div className="absolute -top-8  left-4 w-16 h-16 flex rounded-[1rem] p-1 bg-[#292b2f]">
          {avatarImage ? (
            <img
              src={avatarImage}
              className="  object-cover   rounded-[1rem]"
            />
          ) : (
            <img
              src={shuffle(sideBarImage).pop()}
              className="  object-cover   rounded-[1rem]"
            />
          )}
        </div>

        <p className="text-white font-bold text-[17px] pt-9">{serverName}</p>

        {description.length > 100 ? (
          <p className=" text-gray-400 font-medium text-[15px] pt-1">
            {description.slice(0, 100)}
            {"..."}
          </p>
        ) : (
          <p className=" text-gray-400 font-medium text-[15px] pt-1">
            {description}
          </p>
        )}

        <p className=" text-gray-400 font-medium text-[13.5px] pt-3 pb-4 ">
          {faker.datatype.number({ min: 100, max: 100000 })} Online &#x2022;{" "}
          {faker.datatype.number({ min: 1000, max: 1000000 })} Members
        </p>
      </div>
    </motion.div>
  );
};
export default Card;
