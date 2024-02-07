import React from "react";
import { Progress } from "./Icons";

const Spinner = () => {
  return (
    <>
      <div className="absolute t-0 l-0 w-full h-dvh bg-black opacity-70 z-10 "></div>
      <div className="absolute t-0 l-0 w-full h-dvh z-20 flex justify-center items-center">
        <div className="animate-spin" style={{ animationDuration: "1.5s" }}>
          <Progress height="86" width="86" />
        </div>
      </div>
    </>
  );
};

export default Spinner;
