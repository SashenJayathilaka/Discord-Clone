import React, { useRef, useEffect } from "react";

import bannerSelectFile from "../../hooks/bannerSelectFile";

type ImageSelectorProps = {
  selectedFileb: any;
  setSelectedFileb: any;
  onSelectedFileb: any;
  selectedFileRefb: any;
};

const ImageSelector: React.FC<ImageSelectorProps> = ({
  selectedFileb,
  setSelectedFileb,
  onSelectedFileb,
  selectedFileRefb,
}) => {
  return (
    <div className="py-6">
      <label
        className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
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
              className="max-w-sm h-auto  rounded-md"
            />
            <button
              onClick={() => setSelectedFileb("")}
              type="button"
              className="-mt-8 -ml-4 inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="flex items-end gap-14">
            <img
              src="https://th.bing.com/th/id/R.ec15083dabd0bb490cc809814354c2be?rik=0FHa5ssxIUI48w&pid=ImgRaw&r=0"
              alt=""
              className="max-w-sm h-auto  rounded-md"
            />
            <button
              onClick={() => selectedFileRefb.current?.click()}
              type="button"
              className="-mt-8 -ml-4 inline-block px-6 py-2 border-2 border-gray-400 text-gray-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Uplode Image
            </button>
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
