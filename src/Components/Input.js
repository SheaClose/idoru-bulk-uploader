import React, { useState } from "react";
import cx from "classnames";
/* TODO: add react-hook-form */
const Input = (inputProps) => {
  const [error /* setError */] = useState(null);
  /* const ref = useRef(null);
  useEffect(() => {
    const validity = ref?.current?.validity;
    const { valid, patternMismatch, tooLong, valueMissing } = validity || {};
    const errorMessage = valid
      ? ""
      : valueMissing
        ? "Missing required value"
        : tooLong
          ? "Value too long"
          : patternMismatch
            ? "Invalid character used"
            : null;
    setError(
      errorMessage ? (
        <span className="text-[#F00] text-xs absolute -top-4">
          {errorMessage}
        </span>
      ) : null
    );
  }, [ref]); */

  return (
    <div className="relative">
      {error}
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
    </div>
  );
};

export default Input;
