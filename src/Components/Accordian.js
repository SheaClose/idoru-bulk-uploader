import React, { useState } from "react";
import { ExpandMore, ExpandLess } from "./Icons";
import Button from "./Button";
const Accordian = ({ header, children, className, isOpen = false }) => {
  const [isActive, setIsActive] = useState(isOpen);
  return (
    <>
      <div className={`flex gap-4 items-center ${className}`}>
        <div>{header}</div>
        <Button
          onClick={() => setIsActive(!isActive)}
          theme="actionButton"
          label={isActive ? <ExpandLess /> : <ExpandMore />}
        ></Button>
      </div>
      {isActive ? <div className="accordion-content">{children}</div> : null}
    </>
  );
};

export default Accordian;
