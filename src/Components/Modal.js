import React from "react";
import Button from "./Button";

const Modal = ({ isOpen, header, children, onConfirm, onCancel }) => {
  return isOpen ? (
    <>
      <div className="absolute t-0 l-0 w-full h-dvh bg-black opacity-70 z-10 "></div>
      <div className="absolute t-0 l-0 w-full h-dvh z-20 flex justify-center items-center">
        <div className="w-11/12 md:w-3/4 max-w-3xl bg-white flex flex-col text-black rounded">
          <div className="flex flex-col gap-4 p-8">
            <div className="font-bold text-lg">{header}</div>
            <hr />
            {children}
            <hr />
            <div className="flex justify-end gap-4">
              <Button theme="secondary" label="Cancel" onClick={onCancel} />
              <Button
                onClick={() => onConfirm("accurate")}
                label="Accurate Upload"
              />
              <Button onClick={() => onConfirm("fast")} label="Fast Upload" />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Modal;
