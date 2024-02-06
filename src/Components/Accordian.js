import React, { useState } from "react";
import { ExpandMore, ExpandLess } from "./Icons";
const Accordian = ({ header, children, className, isOpen = false }) => {
  const [isActive, setIsActive] = useState(isOpen);
  return (
    <>
      <div className={`flex gap-4 items-center ${className}`}>
        <div>{header}</div>
        <div
          className="hover:cursor-pointer border border-[--btn-darker] p-1 rounded-md hover:bg-[--btn-hover] bg-[--btn]"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>
      {isActive ? <div className="accordion-content">{children}</div> : null}
    </>
  );
};

export default Accordian;
