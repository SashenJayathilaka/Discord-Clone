import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { motion } from "framer-motion";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { firestore, storage } from "../../firebase/firebase";
import bannerSelectFile from "../../hooks/bannerSelectFile";
import useSelectFile from "../../hooks/useSelectFile";
import ImageSelector from "./ImageSelector";

const sideBarImage = [
  "https://i.postimg.cc/ZK7ngyd5/img1.png",
  "https://i.postimg.cc/Gm623wz0/img2.png",
  "https://i.postimg.cc/qRTvns9j/img3.png",
  "https://i.postimg.cc/W4r4hWfd/img4.png",
];

type CreateServerProps = {};

const CreateServer: React.FC<CreateServerProps> = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const { selectedFileb, setSelectedFileb, onSelectedFileb } =
    bannerSelectFile();
  const selectedFileRefb = useRef<HTMLInputElement>(null);

  const [serverName, setServerName] = useState("");
  const [serverCountry, setServerCountry] = useState("");
  const [description, setDescription] = useState("");
  const [serverType, setServerType] = useState("");
  const [adminName, setAdminName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateCommunity = async () => {
    setLoading(true);

    if (serverName && serverCountry && serverType && description && adminName) {
      try {
        const docRef = await addDoc(collection(firestore, "discord"), {
          userId: session?.user?.uid,
          username: session?.user?.name,
          serverName: serverName,
          profileImage: session?.user?.image,
          company: session?.user?.email,
          serverCountry: serverCountry,
          serverType: serverType,
          adminName: adminName,
          description: description,
          timestamp: serverTimestamp() as Timestamp,
        });

        if (selectedFile) {
          const imageRef = ref(storage, `discord/${docRef.id}/avatar`);

          await uploadString(imageRef, selectedFile as string, "data_url").then(
            async (snapshot) => {
              const downloadUrl = await getDownloadURL(imageRef);
              await updateDoc(doc(firestore, "discord", docRef.id), {
                avatarImage: downloadUrl,
              });
            }
          );
        } else {
          console.log("No Image");
        }

        if (selectedFileb) {
          const imageRef = ref(storage, `discord/${docRef.id}/banner`);

          await uploadString(
            imageRef,
            selectedFileb as string,
            "data_url"
          ).then(async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, "discord", docRef.id), {
              bannerImage: downloadUrl,
            });
          });
        } else {
          console.log("No Image");
        }
        setSelectedFile("");
        setAdminName("");
        setServerName("");
        setSelectedFileb("");
        setDescription("");
        setServerType("");
        setServerCountry("");
        setLoading(false);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!serverName) {
        toast.error("Server Name field is empty", {
          duration: 2000,
          style: {
            background: "#fff",
            color: "#015871",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
        setError("error");
      } else if (!serverCountry) {
        toast.error("Server region field is empty", {
          duration: 2000,
          style: {
            background: "#fff",
            color: "#015871",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
      } else if (!description) {
        toast.error("Description field is empty", {
          duration: 2000,
          style: {
            background: "#fff",
            color: "#015871",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
      } else if (!adminName) {
        toast.error("Admin Name field is empty", {
          duration: 2000,
          style: {
            background: "#fff",
            color: "#015871",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
      } else if (!serverType) {
        toast.error("Server Type field is empty", {
          duration: 2000,
          style: {
            background: "#fff",
            color: "#015871",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
      } else return;
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={
        loading ? `p-4 px-10 animate-pulse cursor-not-allowed` : `p-4 px-10`
      }
    >
      <Toaster />
      <div>
        <p className="text-[28px] text-white font-black">SERVER OVERVIEW</p>
      </div>
      <div className="px-8 py-6">
        <label
          className="block uppercase tracking-wide text-gray-200 text-sm font-bold mb-2"
          htmlFor="grid-city"
        >
          Avatar
        </label>
        <div className="flex justify-start items-center">
          {selectedFile ? (
            <div>
              <img
                src={selectedFile}
                alt=""
                className="object-cover rounded-full w-[108px] h-[108px] cursor-pointer hover:shadow-lg"
                onClick={() => !loading && setSelectedFile("")}
              />
              <p className="text-sm text-white py-2">maximum size 128x128</p>
            </div>
          ) : (
            <div>
              <img
                src={shuffle(sideBarImage).pop()}
                alt="avtar/img"
                className="object-cover rounded-full w-[108px] h-[108px] cursor-pointer hover:shadow-lg animate-pulse border border-gray-500 px-2 py-2"
                onClick={() => !loading && selectedFileRef.current?.click()}
              />
              <p className="text-sm text-white py-2">maximum size 128x128</p>
            </div>
          )}
          {!loading && (
            <div>
              {selectedFile ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedFile("")}
                  type="button"
                  className="-mt-8 -ml-4 inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Remove Image
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => selectedFileRef.current?.click()}
                  type="button"
                  className="-mt-8 -ml-4 inline-block px-6 py-2 border-2 border-discord_blurple text-discord_blurple font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Uplode Image
                </motion.button>
              )}
            </div>
          )}
        </div>
        <ImageSelector
          selectedFileb={selectedFileb}
          setSelectedFileb={setSelectedFileb}
          onSelectedFileb={onSelectedFileb}
          selectedFileRefb={selectedFileRefb}
          loading={loading}
        />
        {/* form */}
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6 mt-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-sm font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Server Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-800 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Example server"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-sm font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Server region
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="US East"
                value={serverCountry}
                onChange={(e) => setServerCountry(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-sm font-bold mb-2"
                htmlFor="grid-password"
              >
                Short Description about server
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                placeholder="Somthing"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-gray-300 text-xs italic">
                {`Make it as long and as crazy as you'd like`}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-sm font-bold mb-2"
                htmlFor="grid-city"
              >
                Admin Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Admin"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-sm font-bold mb-2"
                htmlFor="grid-state"
              >
                Server Type
              </label>
              <div className="relative">
                <select
                  onChange={(e) => setServerType(e.target.value)}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option>Select</option>
                  <option>Gaming</option>
                  <option>Music</option>
                  <option>Education</option>
                  <option>Science & tech</option>
                  <option>Content Creator</option>
                  <option>Anime & Manga</option>
                  <option>Movies & TV</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-sm font-bold mb-2"
                htmlFor="grid-zip"
              >
                anything
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
              />
            </div>
          </div>
        </form>
        {/* form end */}
        {loading ? (
          <button
            type="button"
            className="mb-2 mt-6 w-full inline-block px-6 py-2.5 bg-discord_green  animate-pulse cursor-not-allowed text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-discord_blue hover:shadow-lg focus:bg-discord_blue focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            <AiOutlineLoading3Quarters className="animate-spin m-auto text-xl" />
          </button>
        ) : (
          <button
            type="button"
            className="mb-2 mt-6 w-full inline-block px-6 py-2.5 bg-discord_green text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-discord_blue hover:shadow-lg focus:bg-discord_blue focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleCreateCommunity}
          >
            Create Server
          </button>
        )}
        <div>
          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={onSelectedFile}
          />
        </div>
      </div>
    </motion.div>
  );
};
export default CreateServer;
