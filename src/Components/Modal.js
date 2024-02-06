import React from "react";

const Modal = () => {
  return (
    <>
      <div className="absolute t-0 l-0 w-full h-dvh bg-black opacity-70 z-10 "></div>
      <div className="absolute t-0 l-0 w-full h-dvh z-20 flex justify-center items-center">
        <div className="w-11/12 md:w-3/4 h-3/4 max-w-3xl bg-white flex flex-col text-black rounded p-8">
          Modal!
        </div>
      </div>
    </>
  );
};

export default Modal;
