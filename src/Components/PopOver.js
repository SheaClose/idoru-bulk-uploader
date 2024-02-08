import React from "react";

const PopOver = ({ children, onClick = () => {}, popoverChildren }) => {
  return (
    <div className="relative">
      <div
        onClick={onClick}
        className="/*hidden hoverable element*/ absolute w-12 h-12 inset-0 opacity-0 cursor-pointer
       text-black hover:w-max hover:h-unset hover:opacity-100 hover:border-t-[64px] hover:border-t-transparent z-10"
      >
        <div className="bg-white rounded-md p-4">{popoverChildren}</div>
      </div>
      {children}
    </div>
  );
};

export default PopOver;
