import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import Tooltip from "@mui/material/Tooltip";

const Input = ({
  placeholder,
  className,
  value,
  maxLength,
  onBlur,
  onChange,
  pattern,
  id,
  name: inputName,
  type,
  disabled,
  readOnly,
  required,
  warningLength,
  title,
}) => {
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const { valid, patternMismatch, tooLong, valueMissing } =
      ref?.current?.validity || {};
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
  }, [ref, value]);
  useEffect(() => {
    const warning =
      value?.length > warningLength
        ? "Titles over 16 characters are not recommended"
        : null;
    setWarning(
      warning ? (
        <span className="text-[rgba(255,125,0,0.7)] text-xs absolute -top-4">
          {warning}
        </span>
      ) : null
    );
  }, [value, warningLength]);

  return (
    <Tooltip enterDelay={1000} title={title} leaveDelay={0}>
      <div className="relative">
        {error ? error : warning ? warning : null}
        <div className="flex has-[input:invalid]:ring-red-700 has-[input:invalid]:ring-1">
          {placeholder ? (
            <div className="px-2 flex items-center rounded-l-md bg-[--btn] text-xs text-center">
              {placeholder}:{" "}
            </div>
          ) : null}
          <input
            ref={ref}
            onChange={onChange}
            placeholder={placeholder}
            pattern={pattern}
            id={id}
            name={inputName}
            required={required}
            type={type}
            className={cx(
              "p-4 bg-[--btn] max-w-96 rounded-r-md",
              { "rounded-l-md": !placeholder },
              className
            )}
            value={value}
            onBlur={onBlur}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
          />
        </div>
      </div>
    </Tooltip>
  );
};

export default Input;
