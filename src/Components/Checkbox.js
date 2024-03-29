import React from "react";

const Checkbox = ({
  checkboxName,
  isChecked,
  onChecked,
  verticalOffset,
  disabled,
}) => {
  return (
    <>
      <label
        className="
          container h-4 relative cursor-pointer
          hover:[&_span]:bg-[--btn-text-hover]
          /* when checkbox is selected, set background color = pink */
          [&_input:checked~span]:bg-[--pink]
          /* when input focused, give visual queue like other inputs */
          [&_input:focus~span]:ring-1
          [&_input:focus~span]:ring-white
          /* when input disabled, darken */
          [&_input:disabled~span]:bg-[--btn-text]
          /* initially the check in the checkbox is display: hidden, when checked, turn it on */
          after:[&_input:checked~span]:block
        "
      >
        <input
          disabled={disabled}
          name={checkboxName}
          checked={isChecked}
          onChange={(e) => onChecked(e?.target?.name, e?.target?.checked)}
          type="checkbox"
          className="absolute opacity-0 cursor-pointer h-0 w-0"
        />
        <span
          style={{
            top: verticalOffset ? verticalOffset : "0px",
          }}
          className="
            /* style the checkbox-container */
            absolute left-0 h-3 w-3 bg-white
            /* style the checkmark */
            after:content-['']
            after:absolute after:hidden
            after:border-white
            after:border-solid
            after:left-1
            after:top-0.5
            after:w-1
            after:h-2
            after:border-t-[0px]
            after:border-r-[3px]
            after:border-b-[3px]
            after:border-l-[0px]
            after:rotate-45
          "
        ></span>
      </label>
    </>
  );
};

export default Checkbox;
