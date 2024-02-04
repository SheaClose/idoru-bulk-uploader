import React from "react";

const Input = (inputProps) => (
  <input
    {...inputProps}
    className={`p-4 bg-[--btn] w-96 rounded-md ${inputProps.className}`}
  />
);

export default Input;
