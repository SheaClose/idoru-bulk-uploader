import React, { useRef } from "react";
import Button from "./Button";

const FileImport = ({ onFileUpload, label, accept }) => {
  const inputRef = useRef(null);
  const handleClick = () => inputRef?.current?.click();
  return (
    <span onClick={handleClick}>
      <input
        ref={inputRef}
        type="file"
        multiple={false}
        accept={accept}
        style={{ display: "none" }}
        onChange={onFileUpload}
      />
      {label}
    </span>
  );
};

export default FileImport;
