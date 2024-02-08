import React from "react";
import cx from "classnames";
const Input = (inputProps) => (
  <div className="flex has-[input:invalid]:ring-red-700 has-[input:invalid]:ring-1">
    {inputProps.placeholder ? (
      <div className="px-2 flex items-center rounded-l-md bg-[--btn] text-xs text-center">
        {inputProps.placeholder}:{" "}
      </div>
    ) : null}
    <input
      {...inputProps}
      className={cx(
        "p-4 bg-[--btn] max-w-96 rounded-r-md",
        { "rounded-l-md": !inputProps.placeholder },
        inputProps.className
      )}
      value={inputProps.value}
    />
  </div>
);

export default Input;
