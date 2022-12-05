import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, setDoc } from "firebase/firestore";

import Groups from "./Groups";
import Discover from "./Discover";
import Feed from "./Feed";
import { firestore } from "../firebase/firebase";

type ContainerProps = {
  session: any;
};

const Container: React.FC<ContainerProps> = ({ session }) => {
  const [userCreates, setUserCreate] = useState<boolean>(false);

  const getUserData = async () => {
    if (session) {
      try {
        const docRef = doc(firestore, "users", session?.user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("User Already Created");
        } else {
          setUserCreate(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else return;
  };

  const userCreate = async (session: any) => {
    const userDocRef = doc(firestore, "users", session?.user?.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(session)));
  };

  useEffect(() => {
    getUserData();

    if (userCreates) {
      userCreate(session);
    } else return;
  }, [session, firestore, userCreates]);

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
