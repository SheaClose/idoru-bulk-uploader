import React from "react";

const Checkbox = ({ isChecked, onChecked, verticalOffset }) => {
  return (
    <>
      <label className="container">
        <input
          checked={isChecked}
          onChange={(e) => onChecked(e?.target?.checked)}
          type="checkbox"
        />
        <span
          style={{
            top: verticalOffset ? verticalOffset : "0px",
          }}
          className="checkmark"
        ></span>
      </label>
      <style jsx="true">{`
        /* The container */
        .container {
          display: inline-block;
          position: relative;
          cursor: pointer;
        }

        /* Hide the browser's default checkbox */
        .container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        /* Create a custom checkbox */
        .checkmark {
          position: absolute;
          left: 0;
          height: 14px;
          width: 14px;
          background-color: #fff;
        }

        /* On mouse-over, add a grey background color */
        .container:hover input ~ .checkmark {
          background-color: var(--btn-text-hover);
        }

        /* When the checkbox is checked, add a blue background */
        .container input:checked ~ .checkmark {
          background-color: var(--pink);
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        /* Show the checkmark when checked */
        .container input:checked ~ .checkmark:after {
          display: block;
        }

        /* Style the checkmark/indicator */
        .container .checkmark:after {
          left: 5px;
          top: 2.5px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      `}</style>
    </>
  );
};

export default Checkbox;
