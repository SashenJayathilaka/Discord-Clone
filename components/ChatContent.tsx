import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { firestore, storage } from "../firebase/firebase";
import chatSelectFile from "../hooks/chatSelectFile";
import Chat from "./Chat";

type ChatContentProps = {
  docIds: any;
};

const ChatContent: React.FC<ChatContentProps> = ({ docIds }) => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const { docId } = router.query;
  const { selectedFile, setSelectedFile, onSelectedFile } = chatSelectFile();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState<any[]>([]);
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (selectedFile || message) {
      try {
        const docRef = await addDoc(
          collection(firestore, "discord", docId as string, "chat"),
          {
            userId: session?.user?.uid,
            username: session?.user?.name,
            message: message,
            profileImage: session?.user?.image,
            company: session?.user?.email,
            timestamp: serverTimestamp() as Timestamp,
          }
        );

        if (selectedFile) {
          const imageRef = ref(storage, `discordChat/${docRef.id}/chat`);

          await uploadString(imageRef, selectedFile as string, "data_url").then(
            async (snapshot) => {
              const downloadUrl = await getDownloadURL(imageRef);
              await updateDoc(docRef, {
                chatImage: downloadUrl,
              });
            }
          );
        } else {
          console.log("No Image");
        }
      } catch (error) {
        console.log(error);
      }
      setMessage("");
      setSelectedFile("");
      setLoading(false);
    } else {
      toast.error("Your message field is empty", {
        duration: 2000,
        style: {
          background: "#fff",
          color: "#015871",
          fontWeight: "bolder",
          fontSize: "17px",
          padding: "20px",
        },
      });
    }
    setLoading(false);
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(firestore, "discord", docIds, "chat"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          setChatMessage(snapshot.docs);
        }
      ),
    [firestore]
  );

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [chatMessage]);

  return (
    <>
      {docIds === docId && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex-1 flex flex-col bg-gray-700 overflow-hidden"
        >
          <Toaster />
          <div className="border-b border-gray-600 flex px-6 py-2 items-center flex-none shadow-xl">
            <div className="flex flex-col">
              <h3 className="mb-1 font-bold text-xl text-gray-100">
                <span className="text-gray-400">#</span> general
              </h3>
            </div>
          </div>

          <div className="px-6 py-4 flex-1 overflow-y-scroll scrollbar-hide">
            <div className="border-b border-gray-600 py-3 flex items-start mb-4 text-sm">
              <div className="flex-1 overflow-hidden">
                <div>
                  <h1 className="text-gray-200 text-md text-2xl">
                    Welcome to the channel
                  </h1>
                </div>
                <p className="text-gray-400 leading-normal">
                  <span className="text-gray-400">#</span> Be sure to inclide
                  only relevant material here
                </p>
              </div>
            </div>
            {chatMessage.map((chat) => (
              <div key={chat.id}>
                {docIds === docId && (
                  <Chat
                    chatImage={chat.data().chatImage}
                    matchId={chat.data().userId}
                    username={chat.data().username}
                    timestamp={chat.data().timestamp}
                    profileImage={chat.data().profileImage}
                    message={chat.data().message}
                  />
                )}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
          <div className="pb-6 px-4 flex-none">
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-between items-center"
              >
                <p className="py-2 px-4 flex items-center gap-6 text-red-200 font-bold text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  Be sure to inclide only relevant material here
                </p>
                <img
                  src={selectedFile}
                  alt=""
                  className="max-w-xs max-h-60  rounded-md border border-gray-500 px-2 py-2 cursor-pointer"
                  onClick={() => setSelectedFile("")}
                />
              </motion.div>
            )}
            <div className="flex rounded-lg overflow-hidden">
              <span className="text-3xl text-grey border-r-4 border-gray-600 bg-gray-600 p-2">
                <svg
                  className="h-6 w-6 block bg-gray-500 hover:bg-gray-400 cursor-pointer rounded-xl"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
                    fill="#FFFFFF"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="w-full px-4 bg-gray-600 outline-none text-white font-md"
                placeholder="Message #general"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <span className="text-3xl text-grey border-r-4 border-gray-600 bg-gray-600 p-2 flex justify-between">
                {selectedFile ? (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-200 cursor-pointer"
                      onClick={() => setSelectedFile("")}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </motion.div>
                ) : (
                  <div className="flex gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-200 cursor-pointer hover:text-blue-500"
                        onClick={() => selectedFileRef.current?.click()}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                        />
                      </svg>
                    </motion.div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-200 cursor-pointer hover:text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-200 cursor-pointer hover:text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                )}
                {loading ? (
                  <AiOutlineLoading3Quarters className="w-6 h-6 cursor-pointer ml-12 text-blue-200 animate-spin" />
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 cursor-pointer ml-12 text-blue-200"
                      onClick={sendMessage}
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                  </motion.div>
                )}
              </span>
            </div>
          </div>
          <div>
            <input
              ref={selectedFileRef}
              type="file"
              hidden
              onChange={onSelectedFile}
            />
          </div>
        </motion.div>
      )}
    </>
  );
};
export default ChatContent;
