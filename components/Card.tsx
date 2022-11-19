import React from "react";

import Link from "next/link";

type CardProps = {
  userId: any;
  username: any;
  serverName: any;
  profileImage: any;
  company: any;
  serverCountry: any;
  serverType: any;
  adminName: any;
  avatarImage: any;
  bannerImage: any;
  description: any;
  id: any;
};

const Card: React.FC<CardProps> = ({
  userId,
  username,
  serverName,
  profileImage,
  company,
  serverCountry,
  serverType,
  adminName,
  avatarImage,
  description,
  bannerImage,
  id,
}) => {
  return (
    <div className="w-full">
      <Link href={`/chat/${id}`}>
        <div className="h-40 flex w-full">
          <img
            src={bannerImage}
            className="rounded-t-[0.8rem] object-cover w-full"
          />
        </div>
        <div className="bg-[#292b2f] relative h-[11.5rem] px-[1rem] rounded-b-[0.8rem] ">
          <div className="absolute -top-8  left-4 w-16 h-16 flex rounded-[1rem] p-1 bg-[#292b2f]">
            <img
              src={avatarImage}
              className="  object-cover   rounded-[1rem]"
            />
          </div>

          <p className="text-white font-bold text-[17px] pt-9">{serverName}</p>

          <p className=" text-gray-400 font-medium text-[15px] pt-1">
            {description}
          </p>

          <p className=" text-gray-400 font-medium text-[13.5px] pt-3 pb-4 ">
            {id}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default Card;
