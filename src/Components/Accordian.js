import React, { useState } from "react";
import { ExpandMore, ExpandLess } from "./Icons";
const Accordian = ({ header, children, className, isOpen = false }) => {
  const [isActive, setIsActive] = useState(isOpen);
  return (
    <>
      <div className={`flex gap-4 items-center ${className}`}>
        <div>{header}</div>
        <div
          className="mt-4 hover:cursor-pointer border border-[--btn-text-hover] p-1 rounded-md"
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
