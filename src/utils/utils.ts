import React from "react";

export const handleUploadFile = (
  files: FileList | null,
  setText: React.Dispatch<React.SetStateAction<string>>
) => {
  if (files == null || files.length === 0) {
    return;
  }

  const file = files[0];
  const fileReader = new FileReader();
  fileReader.onloadend = function () {
    setText(fileReader.result as string);
  };

  fileReader.readAsText(file);
};
