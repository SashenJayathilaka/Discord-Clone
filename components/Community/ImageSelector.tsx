import { motion } from "framer-motion";
import React from "react";

type ImageSelectorProps = {
  selectedFileb: any;
  setSelectedFileb: any;
  onSelectedFileb: any;
  selectedFileRefb: any;
  loading: boolean;
};

const ImageSelector: React.FC<ImageSelectorProps> = ({
  selectedFileb,
  setSelectedFileb,
  onSelectedFileb,
  selectedFileRefb,
  loading,
}) => {
  return (
    <div className="py-6">
      <label
        className="block uppercase tracking-wide text-gray-200 text-sm font-bold mb-2"
        htmlFor="grid-first-name"
      >
        Banner Image
      </label>
      <div className="flex flex-werp items-end gap-14">
        {selectedFileb ? (
          <div className="flex items-end gap-14">
            <img
              src={selectedFileb}
              alt=""
              className="max-w-xs max-h-fit  rounded-md cursor-pointer border border-gray-500 px-2 py-2"
              onClick={() => !loading && setSelectedFileb("")}
            />
            {!loading && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedFileb("")}
                type="button"
                className="-mt-8 -ml-4 inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Remove Image
              </motion.button>
            )}
          </div>
        ) : (
          <div className="flex items-end gap-14">
            <img
              src="https://drive.google.com/uc?export=download&id=165KeFfXloGEmSNSJonKTpx_QWV7Tqg6O"
              alt=""
              className="max-w-sm max-h-36 rounded-md animate-pulse cursor-pointer border border-gray-500 px-2 py-2"
              onClick={() => !loading && selectedFileRefb.current?.click()}
            />
            {!loading && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => selectedFileRefb.current?.click()}
                type="button"
                className="-mt-8 -ml-4 inline-block px-6 py-2 border-2 border-discord_blurple text-discord_blurple font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Uplode Image
              </motion.button>
            )}
          </div>
        )}
      </div>
      <div>
        <input
          ref={selectedFileRefb}
          type="file"
          hidden
          onChange={onSelectedFileb}
        />
      </div>
    </div>
  );
};
export default ImageSelector;
