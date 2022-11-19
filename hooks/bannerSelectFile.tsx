import React, { useState } from "react";

const bannerSelectFile = () => {
  const [selectedFileb, setSelectedFileb] = useState<string>();

  const onSelectedFileb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFileb(readerEvent.target.result as string);
      }
    };
  };

  return { selectedFileb, setSelectedFileb, onSelectedFileb };
};
export default bannerSelectFile;
