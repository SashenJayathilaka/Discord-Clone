import { motion } from "framer-motion";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  card: any;
  sideBarImage: string[];
};

function SideGroupList({ card, sideBarImage }: Props) {
  const { data: session }: any = useSession();
  const router = useRouter();

  const handleNavigatePage = () => {
    if (session) {
      router.push({
        pathname: `/chat/${card.id}`,
        query: {
          docId: card.id.toString(),
        },
      });
    } else return;
  };

  return (
    <div className="w-14 h-14 flex cursor-pointer" onClick={handleNavigatePage}>
      {card.data().avatarImage ? (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <img
            src={card.data().avatarImage}
            className="rounded-full w-[57px] h-[57px]"
          />
        </motion.div>
      ) : (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <img
            src={shuffle(sideBarImage).pop()}
            className="rounded-full w-[57px] h-[57px]"
          />
        </motion.div>
      )}
    </div>
  );
}

export default SideGroupList;
